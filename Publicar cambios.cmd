@echo off
title Publicar la copa en GitHub Pages
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0publicar.ps1"
echo.
pause
