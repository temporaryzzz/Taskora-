# Указать базовый образ  
FROM node:alpine AS build
# Задать рабочий каталог  
WORKDIR /app  
# Скопировать файлы package.json и package-lock.json  
COPY package*.json .  
# Установить зависимости  
RUN apk add --no-cache python3 make g++
RUN rm -rf node_modules package-lock.json
RUN npm install
RUN npm ci
# Скопировать файлы приложения  
COPY . .  
# Собрать приложение  
RUN npm run build  

# Продакшн сервер: Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомный конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80