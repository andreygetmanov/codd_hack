# Базовый образ Python
FROM python:3.10-slim

# Установка зависимостей
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Установка зависимостей Python
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Копирование исходного кода
COPY . /app
WORKDIR /app

# Установка переменной окружения для Python
ENV PYTHONUNBUFFERED=1

# Запуск бота
CMD ["python", "bot.py"]
