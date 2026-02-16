# Limbusdle
Веб-застосунок-головоломка за мотивами Limbus Company.

## Технології:
- HTML5 / CSS3 (Vanilla)
- JavaScript (Vanilla)
- MySQL

## Вимоги:
- Docker та Docker Compose
- Windows PowerShell / CMD або Make (для Linux/Mac)

## Як запустити:

### Windows (найпростіше):
1. Двічі клацніть на файл `start.bat`
2. Відкрийте браузер на **http://localhost:8080**
3. Для зупинення запустіть `stop.bat`

### Альтернативно (командний рядок):
```bash
docker-compose up -d        # Запустити
docker-compose down         # Зупинити
docker-compose logs -f      # Переглянути логи
```

### Linux/Mac (з Make):
```bash
make start      # Запустити
make stop       # Зупинити
make restart    # Перезапустити
make logs       # Логи
make clean      # Очистити
```