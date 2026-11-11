# warriors-of-the-night
Warriors of the Night

## Test gry

`node test_gry.mjs` przechodzi wszystkie plansze w Chrome bez okna i zgłasza błędy JavaScriptu.
Opcje: `--tury` (także tura wrogów), `--zrzuty` (zrzuty do `zrzuty_testu/`), `--plansza=las,parow`.

## Modele z zewnątrz

- `models/zakonnik.glb` - "Wizard Teacher Male", riev (https://www.cgtrader.com/free-3d-models/character/man/wizard-teacher-male), CGTrader Royalty Free License (no AI). Zmiany: wlasne kolory i rysy twarzy, wlasny szkielet i animacje, eksport do GLB.
- `models/strzyga.glb` – baza strzygi zbudowana skryptem `models/zrodla/strzyga_baza.py` (plik do dalszej pracy: `models/zrodla/strzyga.blend`, tylko lokalnie - folder poza repo) na manekinie kobiecym i animacjach z Universal Animation Library 1 i 2 autorstwa Quaterniusa (https://quaternius.com, CC0). Dodane: całun, siwe włosy, świecące oczy, pazury.
- `models/katedra.glb` – bryła katedry wg planu Notre-Dame, zbudowana w Blenderze; tekstury kamienia z Poly Haven (medieval_blocks_03, white_sandstone_blocks_02, https://polyhaven.com, CC0), witraże generowane skryptem.
- `models/rzezby.glb` – figury ze skanów Three D Scans (https://threedscans.com, bez ograniczeń praw autorskich): Saint Hugh, Theodoric the Great, Aule Meteli, Athena; siatki zmniejszone w Blenderze, tekstura kamienia rock_surface z Poly Haven (CC0).
- `models/wiatrak.glb` – wiatrak zbudowany w Blenderze; tekstury kamienia i drewna z Poly Haven (https://polyhaven.com, CC0).
- `models/budowle.glb` - budowle wokół Katedry, grobowce i kurhany, wykonane w Blenderze; tekstury ambientCG (CC0).
- `models/diabelski.glb` - diabelski młyn wykonany w Blenderze; tekstury rdzy, farby i betonu generowane skryptem.
- `models/przejscie.glb` - przejście graniczne z budkami, szlabanami i wieżami, wykonane w Blenderze.
- `models/tekstury_szpital/` - tekstury ścian i posadzek szpitala z ambientCG (ambientcg.com, CC0).
- `models/nekromanta.glb` - "Necromancer", dremorn (https://www.cgtrader.com/free-3d-models/character/fantasy-character/necromancer-3d-low-poly-model), CGTrader Royalty Free License (no AI), wyeksportowany do glTF.
- `models/gniewar.glb` - "Ork Berserker", dremorn (https://www.cgtrader.com/free-3d-models/character/fantasy-character/ork-berserker), CGTrader Royalty Free License (no AI), wyeksportowany do glTF.
- `models/dark_warrior.glb` - "Dark Fantasy Sun Knight Warrior", FERUL (https://www.cgtrader.com/free-3d-models/character/fantasy-character/dark-fantasy-sun-knight-warrior-with-pbr-textures), CGTrader Royalty Free License (no AI). Zmiany: uproszczona siatka, wlasny szkielet i animacje, eksport do GLB.
- `models/aniol_rzezba.glb` - "Praying Angel Statue", Ronny-3Dmir (https://www.cgtrader.com/free-3d-print-models/art/sculpture/praying-angel-statue-free), CGTrader Royalty Free License (no AI). Zmiany: uproszczona siatka, eksport do GLB.
- `models/rogacz.glb` - "Monster 1 demon with claws", estrele (https://www.cgtrader.com/free-3d-models/character/fantasy-character/monster-1-16e2532b-fdb4-40a7-afee-97c74e494c7a), CGTrader Royalty Free License (no AI), wyeksportowany do glTF.
- `models/szkieletor.glb` - "Human Skeleton", mehrannaseri (https://www.cgtrader.com/free-3d-models/character/human-anatomy/human-skeleton-c94759ce-746d-4b8e-a352-8d1d6836157c), CGTrader Royalty Free License (no AI). Zmiany: uproszczona siatka, wlasny szkielet i animacje, eksport do GLB.
- `models/furiat.glb` - "Infernal dog", dremorn (https://www.cgtrader.com/free-3d-models/character/fantasy-character/3d-model-infernal-dog), CGTrader Royalty Free License (no AI). Zmiany: dodane animacje, eksport do GLB.
- `models/mamut.glb` - "Prehistoric mammoth skeleton with prominent curved tusks" (https://www.cgtrader.com/free-3d-models/character/human-anatomy/prehistoric-mammoth-skeleton-with-prominent-curved-tusks), Oleg Verenko (CGTrader), Royalty Free License (no AI). Zmiany: wlasny szkielet i animacje, eksport do GLB.
- `models/zakonnica.glb` - "Female Wizard teacher", riev (https://www.cgtrader.com/free-3d-models/character/woman/female-wizard-teacher), CGTrader Royalty Free License (no AI). Zmiany: wlasny szkielet i animacje, eksport do GLB.
- `models/hell_warrior.glb` - "Hell Knight character", CG-Archion (https://www.cgtrader.com/free-3d-models/character/fantasy-character/hell-knight-character), CGTrader Royalty Free License (no AI). Zmiany: uproszczona siatka, poprawiony pancerz i miecz, wlasne kolory, szkielet i animacje, eksport do GLB.
- `models/pelzacz.glb` - "Roach", Atmostatic (https://opengameart.org/content/roach-game-ready-and-animated), CC-BY-SA, wyeksportowany do glTF.
- `models/chata_drwala.glb` - "Woodcutter's Cabin" z Blend Swap (https://www.blendswap.com/blends/view/86149), CC-BY-SA 3.0: chata z drzewami, krzakami i narzędziami, tekstury podpięte i zmniejszone, dach jako osobny obiekt.
- `models/ogar.glb` - ogar piekielny przerobiony z wilka z "Animal Pack Vol.2", Quaternius (https://opengameart.org/content/animated-animales-low-poly), CC0.
- `models/smierc.glb` - postać Śmierci z kosą, wykonana w Blenderze.
- `models/pociagi_rdza.glb` - lokomotywy i wagony z Train Kit autorstwa Kenney (kenney.nl, CC0), postarzone rdzą w Blenderze.
- `models/wiaty.glb` - wiaty z atrakcjami wesołego miasteczka, wykonane w Blenderze.
- `models/chatka_kurza.glb` - chatka na kurzej łapie, wykonana w Blenderze; tekstury generowane skryptem.
- `models/drzewa_straszne.glb` - pięć powykręcanych drzew Mokradeł, generowanych skryptem w Blenderze.
- `models/zwierzeta_karuzeli.glb` - zwierzęta z "LowPoly Animated Farm Animal Pack", Quaternius (https://opengameart.org/content/lowpoly-animated-farm-animal-pack), CC0.
