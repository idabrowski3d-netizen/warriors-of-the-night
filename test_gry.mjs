// Test dymny gry: node test_gry.mjs [--tury] [--zrzuty] [--plansza=las,parow]
// Bez zależności. Sam stawia serwer gry i Chrome bez okna, wchodzi na każdą
// planszę przez panel testowy i zbiera błędy JavaScriptu ze strony.
//   --tury     po wejściu na planszę puszcza też turę wrogów (wolniej)
//   --zrzuty   zapisuje zrzut każdej planszy do katalogu zrzuty_testu/
// Kod wyjścia 1, gdy którakolwiek plansza rzuciła wyjątek.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const KATALOG = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const PORT_GRY = 8131, PORT_CDP = 9341;
const arg = (n) => process.argv.find(a => a === n || a.startsWith(n + '='));
const TURY = !!arg('--tury'), ZRZUTY = !!arg('--zrzuty');
const WYBRANE = arg('--plansza') ? arg('--plansza').split('=')[1].split(',') : null;
const czekaj = ms => new Promise(r => setTimeout(r, ms));

const CHROME = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].find(p => fs.existsSync(p));
if (!CHROME) { console.error('Nie znaleziono Chrome ani Edge.'); process.exit(2); }

const serwer = spawn(process.execPath, [path.join(KATALOG, 'serwer.js'), String(PORT_GRY)], { stdio: 'ignore' });
const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'test-gry-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT_CDP}`, `--user-data-dir=${profil}`,
    '--window-size=1400,900', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', 'about:blank'], { stdio: 'ignore' });

let ws, nr = 0;
const oczekujace = new Map();
let bledy = [], ostrzezenia = [];

async function polacz() {
    for (let i = 0; i < 60 && !ws; i++) {
        try {
            const lista = await (await fetch(`http://127.0.0.1:${PORT_CDP}/json/list`)).json();
            const strona = lista.find(t => t.type === 'page');
            if (strona) ws = new WebSocket(strona.webSocketDebuggerUrl);
        } catch (e) {}
        if (!ws) await czekaj(250);
    }
    await new Promise(r => ws.addEventListener('open', r));
    ws.addEventListener('message', ev => {
        const m = JSON.parse(ev.data);
        if (m.id && oczekujace.has(m.id)) { oczekujace.get(m.id)(m); oczekujace.delete(m.id); return; }
        if (m.method === 'Runtime.exceptionThrown') {
            const d = m.params.exceptionDetails;
            const opis = (d.exception && d.exception.description || d.text || '').split('\n')[0];
            // Brakujący plik (model, dźwięk) to ostrzeżenie, nie błąd kodu
            (/HTTP 404/.test(opis) ? ostrzezenia : bledy).push(`${opis} (linia ${d.lineNumber})`);
        } else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
            ostrzezenia.push('console.error: ' + m.params.args.map(a => a.value || a.description).join(' '));
        }
    });
}
const wyslij = (method, params = {}) => new Promise(r => { const i = ++nr; oczekujace.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
async function wykonaj(js) {
    const r = await wyslij('Runtime.evaluate', { expression: js, returnByValue: true, awaitPromise: true });
    const res = r.result || {};
    if (res.exceptionDetails) return { blad: (res.exceptionDetails.exception || {}).description || res.exceptionDetails.text };
    return res.result ? res.result.value : null;
}

let kod = 0;
try {
    await polacz();
    await wyslij('Runtime.enable'); await wyslij('Page.enable');
    await wyslij('Page.navigate', { url: `http://127.0.0.1:${PORT_GRY}/game13.html` });
    await czekaj(9000);
    if (bledy.length) { console.log('Błędy przy starcie gry:'); bledy.forEach(b => console.log('  ' + b)); kod = 1; bledy = []; }

    const plansze = (await wykonaj('COMBAT_THEMES.map(t => t.id)')).filter(id => !WYBRANE || WYBRANE.includes(id));
    if (ZRZUTY) fs.mkdirSync(path.join(KATALOG, 'zrzuty_testu'), { recursive: true });
    console.log(`Plansz do sprawdzenia: ${plansze.length}${TURY ? ' (z turą wrogów)' : ''}`);

    for (const id of plansze) {
        const start = Date.now();
        const stan = await wykonaj(`(async () => {
            forcedThemeId = '${id}'; forcedMissionType = null; forcedTimeOfDay = null;
            runTestMission();
            await new Promise(r => setTimeout(r, 3000));
            return { wrogow: enemies.filter(e => !e.isDead).length, wojownikow: soldiers.filter(s => !s.isDead).length,
                     przeszkod: obstaclePositions.length, rysowan: renderer.info.render.calls };
        })()`);
        if (TURY && stan && !stan.blad) {
            stan.tura = await wykonaj(`(async () => {
                soldiers.forEach(s => { s.ap = 0; s.turnEnded = true; });
                startEnemyTurn();
                for (let i = 0; i < 60 && !isPlayerTurn && !gameOver; i++) await new Promise(r => setTimeout(r, 500));
                return isPlayerTurn || gameOver ? 'ok' : 'tura wrogów nie skończyła się w 30 s';
            })()`);
        }
        if (ZRZUTY) {
            const z = await wyslij('Page.captureScreenshot', { format: 'png' });
            fs.writeFileSync(path.join(KATALOG, 'zrzuty_testu', id + '.png'), Buffer.from(z.result.data, 'base64'));
        }
        const problem = (stan && stan.blad) || (stan && stan.tura && stan.tura !== 'ok' ? stan.tura : null) ||
                        (stan && stan.wojownikow === 0 ? 'brak wojowników na planszy' : null);
        const czas = ((Date.now() - start) / 1000).toFixed(1);
        if (bledy.length || problem) {
            kod = 1;
            console.log(`BŁĄD  ${id} (${czas} s)`);
            if (problem) console.log('      ' + problem);
            [...new Set(bledy)].forEach(b => console.log('      ' + b));
        } else {
            console.log(`ok    ${id} (${czas} s) wrogów ${stan.wrogow}, przeszkód ${stan.przeszkod}, rysowań ${stan.rysowan}`);
        }
        bledy = [];
    }
    if (ostrzezenia.length) {
        console.log('\nOstrzeżenia (brakujące pliki itp.):');
        [...new Set(ostrzezenia)].forEach(o => console.log('  ' + o));
    }
    console.log(kod ? '\nTEST NIEUDANY' : '\nWszystkie plansze bez błędów.');
} catch (e) {
    console.log('Błąd sterownika testu:', e);
    kod = 1;
} finally {
    try { ws.close(); } catch (e) {}
    chrome.kill(); serwer.kill();
    setTimeout(() => { try { fs.rmSync(profil, { recursive: true, force: true }); } catch (e) {} process.exit(kod); }, 500);
}
