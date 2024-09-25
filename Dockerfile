# Используем базовый образ Node.js
FROM node:16

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/auth

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Указываем порт, на котором будет работать приложение
EXPOSE 3000

# Запускаем приложение
CMD [ "node", "dist/main.js" ]