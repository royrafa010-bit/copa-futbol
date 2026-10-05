@echo off
title Publicar la copa en GitHub
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0publicar_github.ps1"
echo.
pause
