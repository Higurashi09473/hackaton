#!/bin/bash

echo "Останавливаем приложение..."

# Останавливаем процессы из PID файлов
if [ -f "backend.pid" ]; then
    PID=$(cat backend.pid)
    if kill -0 $PID 2>/dev/null; then
        kill $PID
        echo "Остановлен бэкенд (PID: $PID)"
    fi
    rm backend.pid
fi

if [ -f "frontend.pid" ]; then
    PID=$(cat frontend.pid)
    if kill -0 $PID 2>/dev/null; then
        kill $PID
        echo "Остановлен фронтенд (PID: $PID)"
    fi
    rm frontend.pid
fi

# Гарантированно убиваем процессы по портам
lsof -ti:8888 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null

echo "✅ Все процессы остановлены"
