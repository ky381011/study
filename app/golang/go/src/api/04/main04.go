package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

const baseURL = "https://api.openweathermap.org/data/2.5/weather"

type WeatherResponse struct {
	Name string `json:"name"`
	Main struct {
		Temp     float64 `json:"temp"`
		Humidity int     `json:"humidity"`
	} `json:"main"`
	Weather []struct {
		Main        string `json:"main"`
		Description string `json:"description"`
	} `json:"weather"`
}

func getWeather(city string, apiKey string) (*WeatherResponse, error) {
	url := fmt.Sprintf("%s?q=%s&appid=%s&units=metric", baseURL, city, apiKey)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result WeatherResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	return &result, nil
}

func main() {
	apiKey := os.Getenv("OPEN_WEATHER_API")
	if apiKey == "" {
		log.Fatal("APIキーが環境変数 OPEN_WEATHER_API に設定されていません")
	}

	city := "Tokyo"
	weather, err := getWeather(city, apiKey)
	if err != nil {
		log.Fatalf("天気取得失敗: %v", err)
	}

	fmt.Printf("%sの天気: %s (%s), 気温: %.1f°C, 湿度: %d%%\n",
		weather.Name,
		weather.Weather[0].Main,
		weather.Weather[0].Description,
		weather.Main.Temp,
		weather.Main.Humidity,
	)
}

/*
# go run main04.go
Tokyoの天気: Clear (clear sky), 気温: 28.4°C, 湿度: 71%
*/
