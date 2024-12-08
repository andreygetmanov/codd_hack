import os
import time

import requests
import json

routes = [
    {
        "start_coords": [45.055512, 39.025448],
        "end_coords": [45.035509, 39.018190],
        "depo": "Панорама-Северная",
        "nfs": 480
    },
    {
        "start_coords": [45.035326, 39.019255],
        "end_coords": [45.055582, 39.025821],
        "depo": "Северная-Панорама",
        "nfs": 480
    },
    {
        "start_coords": [45.027677, 39.028659],
        "end_coords": [45.034649, 39.016222],
        "depo": "Ялтинская-Северная",
        "nfs": 240
    },
    {
        "start_coords": [45.034262, 39.01664],
        "end_coords": [45.055512, 39.025448],
        "depo": "Северная-Ялтинская",
        "nfs": 240
    },
    {
        "start_coords": [45.054704, 38.989790],
        "end_coords": [45.059548, 38.988171],
        "depo": "Колхозная-Офицерская",
        "nfs": 120
    },
    {
        "start_coords": [45.058429, 38.983794],
        "end_coords": [45.054925, 38.989569],
        "depo": "Офицерская-Колхозная",
        "nfs": 120
    }
]




def get_route_duration(api_key, start_coords, end_coords):
    """
    Получает время маршрута в секундах с учётом пробок через 2Gis API.

    :param api_key: str, ключ API для 2Gis
    :param start_coords: tuple, координаты начала маршрута (широта, долгота)
    :param end_coords: tuple, координаты конца маршрута (широта, долгота)
    :return: int, время маршрута в секундах
    """
    url = f"https://routing.api.2gis.com/carrouting/6.0.0/global?key={api_key}"
    headers = {"Content-Type": "application/json"}
    data = {
        "points": [
            {"type": "car", "x": start_coords[1], "y": start_coords[0]},
            {"type": "car", "x": end_coords[1], "y": end_coords[0]}
        ]
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        response.raise_for_status()
        result = response.json()

        # Проверяем наличие данных о маршруте
        if "result" in result and len(result["result"]) > 0:
            return result["result"][0]["total_duration"]
        else:
            raise ValueError("Маршрут не найден или данные отсутствуют.")

    except requests.exceptions.RequestException as e:
        print(f"Ошибка при выполнении запроса: {e}")
        return None
    except ValueError as ve:
        print(ve)
        return None


def send_route_data(api_url, nfs, depo, lt_loc, ln_loc):
    """
    Отправляет данные в формате JSON через POST-запрос.

    :param api_url: str, URL для отправки данных
    :param nfs: int, максимальное время прохождения участка
    :param depo: str, название маршрута
    :param lt_loc: float, широта
    :param ln_loc: float, долгота
    :return: dict, ответ от сервера
    """
    payload = {
        "nfs": nfs,
        "depo": depo,
        "lt_loc_start": lt_loc[0],
        "lt_loc_end": lt_loc[1],
        "ln_loc_start": ln_loc[0],
        "ln_loc_end": ln_loc[1]
    }

    try:
        response = requests.post(api_url, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return None


# Пример использования
if __name__ == "__main__":
    while True:
        key = os.getenv("API_KEY_2")
        backend_url = os.getenv("FASTAPI_URL_B")
        # Пример доступа к данным
        for route in routes:
            max_dur = route['nfs']
            depo = route['depo']
            start = route['start_coords']
            end = route['end_coords']
            nfs = get_route_duration(key, start, end)
            response = send_route_data(backend_url, nfs, depo, start, end)
        waiting = 10
        print(f'Ожидаем {waiting} минут')
        time.sleep(waiting * 60)
