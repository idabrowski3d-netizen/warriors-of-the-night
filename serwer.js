// Lokalny serwer gry: node serwer.js [port]. Bez zależności. Zastępuje
// python -m http.server, który pod ~30 równoległymi pobraniami .glb zrywał połączenia.
const http = require('http'), fs = require('fs'), path = require('path');
const port = +process.argv[2] || 8000, root = __dirname + path.sep;
const TYPY = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css',
    '.glb': 'model/gltf-binary', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.ogg': 'audio/ogg', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.mp4': 'video/mp4',
};

http.createServer((req, res) => {
    let p;
    try { p = decodeURIComponent(req.url.split('?')[0]); } catch (e) { res.writeHead(400); return res.end(); }
    const plik = path.join(root, p === '/' ? 'index.html' : p);
    if (!plik.startsWith(root)) { res.writeHead(403); return res.end(); }
    fs.stat(plik, (err, st) => {
        if (err || !st.isFile()) { res.writeHead(404); return res.end('404'); }
        res.writeHead(200, {
            'Content-Type': TYPY[path.extname(plik).toLowerCase()] || 'application/octet-stream',
            'Content-Length': st.size,
            'Cache-Control': 'no-cache',   // po zmianie pliku przeglądarka bierze nową wersję
        });
        fs.createReadStream(plik).pipe(res);
    });
}).listen(port, '127.0.0.1', 511, () => console.log(`Gra: http://localhost:${port}/game13.html  (Ctrl+C kończy)`));
