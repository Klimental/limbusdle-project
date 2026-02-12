FROM php:8.2-apache

# Встановлюємо необхідні драйвери для підключення до MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Копіюємо вміст src (разом з підпапкою php) у веб-директорію
COPY ./src /var/www/html/

# Надаємо права доступу
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80