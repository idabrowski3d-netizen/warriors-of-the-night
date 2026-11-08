# warriors-of-the-night
Warriors of the Night

## Test gry

`node test_gry.mjs` przechodzi wszystkie plansze w Chrome bez okna i zgłasza błędy JavaScriptu.
Opcje: `--tury` (także tura wrogów), `--zrzuty` (zrzuty do `zrzuty_testu/`), `--plansza=las,parow`.

## Modele z zewnątrz

- `models/zakonnik.glb` – "Monk animated" (https://opengameart.org/content/monk-animated), model i rig: CDmir ("Monk", https://opengameart.org/content/monk), animacje: hwoarangmy. Licencja CC-BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0/). Zmiany: nazwy animacji, materiały pod glTF, eksport do GLB.
- `models/strzyga.glb` – baza strzygi zbudowana skryptem `models/zrodla/strzyga_baza.py` (plik do dalszej pracy: `models/zrodla/strzyga.blend`, tylko lokalnie - folder poza repo) na manekinie kobiecym i animacjach z Universal Animation Library 1 i 2 autorstwa Quaterniusa (https://quaternius.com, CC0). Dodane: całun, siwe włosy, świecące oczy, pazury.
- `models/katedra.glb` – bryła katedry wg planu Notre-Dame, zbudowana w Blenderze; tekstury kamienia z Poly Haven (medieval_blocks_03, white_sandstone_blocks_02, https://polyhaven.com, CC0), witraże generowane skryptem.
- `models/rzezby.glb` – figury ze skanów Three D Scans (https://threedscans.com, bez ograniczeń praw autorskich): Saint Hugh, Theodoric the Great, Aule Meteli, Athena; siatki zmniejszone w Blenderze, tekstura kamienia rock_surface z Poly Haven (CC0).
- `models/wiatrak.glb` – wiatrak zbudowany w Blenderze; tekstury kamienia i drewna z Poly Haven (https://polyhaven.com, CC0).
- `models/budowle.glb` - budowle wokół Katedry, grobowce i kurhany, wykonane w Blenderze; tekstury ambientCG (CC0).
