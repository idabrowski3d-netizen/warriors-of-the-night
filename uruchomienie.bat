@echo off
cd /d "%~dp0"
start "" cmd /k "node serwer.js 8000"
timeout /t 1 /nobreak >nul
start "" http://localhost:8000/game13.html
