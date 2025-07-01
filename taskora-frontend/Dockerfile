# Указать базовый образ  
FROM node:alpine  
# Задать рабочий каталог  
WORKDIR /app  
# Скопировать файлы package.json и package-lock.json  
COPY package*.json .  
# Установить зависимости  
RUN npm install  
# Скопировать файлы приложения  
COPY . .  
# Собрать приложение  
RUN npm run build  

EXPOSE 3000  
# Запустить приложение  
CMD ["npm", "run", "preview"]