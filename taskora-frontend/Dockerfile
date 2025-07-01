# Указать базовый образ  
FROM node:alpine as build
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

EXPOSE 3000  
# Запустить приложение  
CMD ["npm", "run", "preview"]