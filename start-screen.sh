#!/bin/bash

# 1. Создаем screen сессию
SESSION_NAME="myapp"

# 2. Останавливаем старые процессы
./stop.sh

# 3. Запускаем новую screen сессию
screen -dmS $SESSION_NAME

# 4. Запускаем бэкенд в screen
screen -S $SESSION_NAME -X screen -t backend bash -c "echo 'Запуск бэкенда...'; cd backend && go run cmd/main.go; echo 'Бэкенд остановлен. Нажмите Ctrl+C для выхода.'; exec bash"

# Ждем 3 секунды
sleep 3

# 5. Запускаем фронтенд в screen
screen -S $SESSION_NAME -X screen -t frontend bash -c "echo 'Запуск фронтенда...'; cd frontend && npm run dev --host; echo 'Фронтенд остановлен. Нажмите Ctrl+C для выхода.'; exec bash"

echo "✅ Приложение запущено в screen сессии '$SESSION_NAME'"
echo ""
echo "Команды для управления:"
echo "  screen -r $SESSION_NAME  - подключиться к сессии"
echo "  screen -ls               - список всех сессий"
echo "  Ctrl+A, D                - отключиться от сессии"
echo "  screen -XS $SESSION_NAME quit - остановить сессию"
