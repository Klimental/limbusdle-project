@echo off
REM Скрипт для зупинення проекту Limbusdle
echo ===============================================
echo   Limbusdle - Зупинення проекту
echo ===============================================
echo.

docker-compose down

echo.
echo Проект зупинено!
echo.
pause
