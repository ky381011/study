import requests
import os


class WeatherFetcher():
    """
    OpenWeatherMap API を使って現在の天気情報を取得するクラス
    """

    def __init__(self, city: str = "蒲田,JP"):
        self.api_key = os.environ["OPEN_WEATHER_API"]
        self.city = city
        self.base_url = "https://api.openweathermap.org/data/2.5/weather"

    def get_current_weather(self) -> dict:
        """
        現在の天気情報を取得する
        """
        params = {
            "q": self.city,
            "appid": self.api_key,
            "units": "metric",
            "lang": "ja"
        }

        response = requests.get(self.base_url, params=params)

        if response.status_code != 200:
            raise RuntimeError(f"APIリクエスト失敗: {response.status_code} - {response.text}")

        return response.json()

    def display_weather(self):
        """
        天気情報を日本語でわかりやすく表示
        """
        try:
            data = self.get_current_weather()
            print("📍 地点:", data["name"])
            print("🌡️ 気温:", data["main"]["temp"], "℃")
            print("💧 湿度:", data["main"]["humidity"], "%")
            print("🌤️ 天気:", data["weather"][0]["description"])
            print("🌬️ 風速:", data["wind"]["speed"], "m/s")
        except Exception as e:
            print("エラー:", e)
