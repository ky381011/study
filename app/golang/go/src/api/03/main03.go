package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

const baseURL = "https://api.switch-bot.com/v1.1"

type PlugMiniStatus struct {
	StatusCode int    `json:"statusCode"`
	Message    string `json:"message"`
	Body       struct {
		DeviceId         string  `json:"deviceId"`
		Power            string  `json:"power"`            // "on"/"off"
		ElectricCurrent  float64 `json:"electricCurrent"`  // A
		ElectricityOfDay float64 `json:"electricityOfDay"` // Wh
		Voltage          float64 `json:"voltage"`          // V
		Weight           float64 `json:"weight"`           // W
	} `json:"body"`
}

func getPlugMiniStatus(token, deviceID string) (*PlugMiniStatus, error) {
	url := fmt.Sprintf("%s/devices/%s/status", baseURL, deviceID)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", token)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var status PlugMiniStatus
	if err := json.Unmarshal(bodyBytes, &status); err != nil {
		return nil, err
	}

	return &status, nil
}

func main() {
	token := os.Getenv("SWITCHBOT_TOKEN")
	if token == "" {
		log.Fatal("環境変数 SWITCHBOT_TOKEN が未設定です。")
	}
	plugID := os.Getenv("SWITCHBOT_PLUG_MINI_MAIN_ID")
	// plug2ID := os.Getenv("SWITCHBOT_PLUG_MINI_SECOND_ID")

	if plugID == "" {
		log.Fatal("環境変数 SWITCHBOT_PLUG_MINI_MAIN_ID が未設定です。")
	}

	status, err := getPlugMiniStatus(token, plugID)
	if err != nil {
		log.Printf("PlugMini ステータス取得失敗")
	}

	log.Printf("PlugMini : 消費電力: %.1fW, 電圧: %.1fV, 日消費電力: %.1fWh",
		status.Body.Weight, status.Body.Voltage, status.Body.ElectricityOfDay)
}

/*
# go run main03.go
2025/07/07 11:41:31 PlugMini : 消費電力: 117.9W, 電圧: 103.5V, 日消費電力: 701.0Wh
*/
