import os

from aiogram import Bot, Dispatcher, types
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, ReplyKeyboardRemove
from aiogram.utils import executor
import requests

# Ваш токен бота
BOT_TOKEN = os.getenv("BOT_TOKEN")
FASTAPI_URL = os.getenv("FASTAPI_URL")

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher(bot)

# Шаги для взаимодействия с пользователем
user_data = {}

# Кнопки для выбора происшествия
incident_buttons = ReplyKeyboardMarkup(resize_keyboard=True)
incident_buttons.add(
    KeyboardButton("ДТП"),
    KeyboardButton("Затор"),
    KeyboardButton("Не работает светофор"),
    KeyboardButton("Другое")
)

# Главная кнопка
main_menu = ReplyKeyboardMarkup(resize_keyboard=True)
main_menu.add(KeyboardButton("Сообщить о происшествии"))


@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    await message.answer("Привет! Нажми кнопку, чтобы сообщить о происшествии.", reply_markup=main_menu)


@dp.message_handler(lambda message: message.text == "Сообщить о происшествии")
async def request_location(message: types.Message):
    user_data[message.from_user.id] = {}
    location_button = ReplyKeyboardMarkup(resize_keyboard=True).add(
        KeyboardButton("Отправить геолокацию", request_location=True)
    )
    await message.answer("Пожалуйста, отправьте вашу геолокацию.", reply_markup=location_button)


@dp.message_handler(content_types=['location'])
async def receive_location(message: types.Message):
    user_data[message.from_user.id]['location'] = {
        "latitude": message.location.latitude,
        "longitude": message.location.longitude
    }
    await message.answer("Что произошло?", reply_markup=incident_buttons)


@dp.message_handler(lambda message: message.text in ["ДТП", "Затор", "Не работает светофор", "Другое"])
async def receive_incident(message: types.Message):
    user_data[message.from_user.id]['incident'] = message.text
    if user_data[message.from_user.id]['incident'] != "Другое":
        # Отправляем данные в FastAPI
        try:
            data_to_send = {
                "latitude": user_data[message.from_user.id]['location']['latitude'],
                "longitude": user_data[message.from_user.id]['location']['longitude'],
                "incident": user_data[message.from_user.id]['incident']
            }

            response = requests.post(FASTAPI_URL, json=data_to_send)
            response.raise_for_status()
            await message.answer("Спасибо за сообщение! Информация отправлена.", reply_markup=main_menu)
        except requests.RequestException as e:
            await message.answer("Произошла ошибка при отправке данных. Попробуйте позже.", reply_markup=main_menu)

        # Очищаем данные пользователя
        user_data.pop(message.from_user.id, None)
    else:
        await message.answer("Опишите проблему текстом.", reply_markup=ReplyKeyboardRemove())
        user_data[message.from_user.id]['incident'] = "Другое"


@dp.message_handler(content_types=['text'])
async def handle_text(message: types.Message):
    if message.from_user.id in user_data and 'incident' in user_data[message.from_user.id] and \
            user_data[message.from_user.id]['incident'] == "Другое":
        user_data[message.from_user.id]['incident_description'] = message.text

        # Отправляем данные в FastAPI
        try:
            data_to_send = {
                "latitude": float(user_data[message.from_user.id]['location']['latitude']),
                "longitude": float(user_data[message.from_user.id]['location']['longitude']),
                "incident": str(user_data[message.from_user.id]['incident']),
                "description": str(user_data[message.from_user.id]['incident_description'])
            }

            response = requests.post(FASTAPI_URL, json=data_to_send)
            response.raise_for_status()
            await message.answer("Спасибо за сообщение! Информация отправлена.", reply_markup=main_menu)
        except requests.RequestException as e:
            await message.answer("Произошла ошибка при отправке данных. Попробуйте позже." + str(e.request), reply_markup=main_menu)

        # Очищаем данные пользователя
        user_data.pop(message.from_user.id, None)


if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True)