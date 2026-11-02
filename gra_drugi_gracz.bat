@echo off
rem Dla drugiego gracza: wystarczy ten plik i Windows 10/11. Sam pobiera gre z GitHuba
rem (tylko gdy jest nowsza wersja), w razie potrzeby Node.js, stawia serwer i otwiera gre.
title Warriors of the Night
cd /d "%~dp0"
set "REPO=idabrowski3d-netizen/warriors-of-the-night"
set "GRA=WarriorsOfTheNight"
set "NODE_WER=v22.11.0"
set "PORT=8000"

where curl >nul 2>nul || goto brak_narzedzi
where tar >nul 2>nul || goto brak_narzedzi

echo Sprawdzam wersje gry...
set "NOWA="
for /f "delims=" %%s in ('curl -fsSL -H "Accept: application/vnd.github.sha" "https://api.github.com/repos/%REPO%/commits/main" 2^>nul') do set "NOWA=%%s"
set "STARA="
if exist "%GRA%\wersja.txt" set /p STARA=<"%GRA%\wersja.txt"
if exist "%GRA%\game13.html" if "%NOWA%"=="" goto node
if exist "%GRA%\game13.html" if "%NOWA%"=="%STARA%" goto node

echo Pobieram gre (okolo 200 MB, to moze chwile potrwac)...
curl -fL --retry 3 -o gra_pobrana.zip "https://github.com/%REPO%/archive/refs/heads/main.zip" || goto blad_pobierania
echo Rozpakowuje...
rmdir /s /q gra_tmp 2>nul
mkdir gra_tmp
tar -xf gra_pobrana.zip -C gra_tmp || goto blad_pobierania
del gra_pobrana.zip
rmdir /s /q "%GRA%" 2>nul
move gra_tmp\warriors-of-the-night-main "%GRA%" >nul || goto blad_pobierania
rmdir /s /q gra_tmp
if not "%NOWA%"=="" >"%GRA%\wersja.txt" echo %NOWA%

:node
set "NODE=node"
where node >nul 2>nul && goto start
set "NODE=%CD%\node_gry\node-%NODE_WER%-win-x64\node.exe"
if exist "%NODE%" goto start
echo Pobieram Node.js (okolo 30 MB)...
curl -fL --retry 3 -o node_pobrany.zip "https://nodejs.org/dist/%NODE_WER%/node-%NODE_WER%-win-x64.zip" || goto blad_pobierania
mkdir node_gry 2>nul
tar -xf node_pobrany.zip -C node_gry || goto blad_pobierania
del node_pobrany.zip

:start
start "Serwer gry - nie zamykaj podczas grania" /d "%CD%\%GRA%" "%NODE%" serwer.js %PORT%
timeout /t 2 /nobreak >nul
start "" http://localhost:%PORT%/game13.html
exit /b 0

:brak_narzedzi
echo Brakuje programow curl lub tar. Potrzebny jest Windows 10 w wersji 1803 lub nowszy.
pause
exit /b 1

:blad_pobierania
echo Nie udalo sie pobrac plikow. Sprawdz internet i wolne miejsce na dysku, potem sprobuj ponownie.
pause
exit /b 1
