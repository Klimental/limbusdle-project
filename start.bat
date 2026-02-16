@echo off
REM Скрипт для запуску проекту Limbusdle
echo ===============================================
echo   Limbusdle - Запуск проекту
echo ===============================================
echo.

REM Перевіряємо наявність Docker
docker --version >nul 2>&1
if errorlevel 1 (
    echo Помилка: Docker не знайдено!
    echo Будь ласка, встановіть Docker Desktop.
    pause
    exit /b 1
)

echo [1/3] Зупинення попередніх контейнерів...
docker-compose down

echo.
echo [2/3] Збирання образів та запуск контейнерів...
docker-compose up -d

echo.
echo [3/3] Очікування запуску сервісів...
timeout /t 3 /nobreak

echo.
echo ===============================================
echo   Проект успішно запущений!
echo ===============================================
echo.
echo Адреси:
echo   - Веб-застосунок: http://localhost:8080
echo   - API: http://localhost:8080/php/get_identities.php
echo.
echo Команди:
echo   - Переглянути логи: docker-compose logs -f
echo   - Зупинити проект: docker-compose down
echo.
pause
