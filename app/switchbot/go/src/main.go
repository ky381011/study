package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

const baseURL = "https://api.switch-bot.com/v1.1"

type Hub2Status struct {
	StatusCode int    `json:"statusCode"`
	Message    string `json:"message"`
	Body       struct {
		DeviceId    string  `json:"deviceId"`
		Temperature float64 `json:"temperature"`
		Humidity    float64 `json:"humidity"`
	} `json:"body"`
}

func getHub2Status(token string, deviceID string) (*Hub2Status, error) {
	url := fmt.Sprintf("%s/devices/%s/status", baseURL, deviceID)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", token)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var status Hub2Status
	if err := json.Unmarshal(bodyBytes, &status); err != nil {
		return nil, err
	}

	return &status, nil
}

func main() {
	token := os.Getenv("SWITCHBOT_TOKEN")
	deviceID := os.Getenv("SWITCHBOT_HUB2_ID")

	if token == "" || deviceID == "" {
		log.Fatal("SWITCHBOT_TOKEN または SWITCHBOT_HUB2_ID が未設定です")
	}

	status, err := getHub2Status(token, deviceID)
	if err != nil {
		log.Fatalf("ハブ2のステータス取得に失敗: %v", err)
	}

	fmt.Printf("🌡 温度: %.1f°C\n", status.Body.Temperature)
	fmt.Printf("💧 湿度: %.1f%%\n", status.Body.Humidity)
}
