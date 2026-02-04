# Використовуємо легкий образ веб-сервера Nginx
FROM nginx:alpine

# Копіюємо всі твої файли (index.html, css, js, img) у папку сервера
COPY ./src /usr/share/nginx/html

# Відкриваємо 80 порт для перегляду в браузері
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]