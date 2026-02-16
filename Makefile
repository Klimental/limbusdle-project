.PHONY: help start stop logs restart clean

help:
	@echo "Limbusdle - Доступні команди:"
	@echo ""
	@echo "  make start    - запустити проект"
	@echo "  make stop     - зупинити проект"
	@echo "  make restart  - перезапустити проект"
	@echo "  make logs     - переглянути логи"
	@echo "  make clean    - видалити контейнери та том"

start:
	@echo "▶ Запуск проекту..."
	docker-compose up -d
	@echo "✓ Проект запущено на http://localhost:8080"

stop:
	@echo "⏹ Зупинення проекту..."
	docker-compose down

restart:
	@echo "🔄 Перезапуск проекту..."
	docker-compose restart

logs:
	docker-compose logs -f

clean:
	@echo "🗑 Видалення контейнерів..."
	docker-compose down -v
	@echo "✓ Очищено"
