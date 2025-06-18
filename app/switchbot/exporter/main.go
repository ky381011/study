package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// SwitchBot API レスポンス構造体
type StatusResponse struct {
	StatusCode int    `json:"statusCode"`
	Message    string `json:"message"`
	Body       struct {
		Temperature float64 `json:"temperature"`
		Humidity    float64 `json:"humidity"`
	} `json:"body"`
}

// メトリクス
var (
	temperatureGauge = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "switchbot_temperature_celsius",
		Help: "Temperature reported by SwitchBot Hub 2",
	})
	humidityGauge = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "switchbot_humidity_percent",
		Help: "Humidity reported by SwitchBot Hub 2",
	})
)

func init() {
	// Prometheusに登録
	prometheus.MustRegister(temperatureGauge)
	prometheus.MustRegister(humidityGauge)
}

func fetchData(token, deviceID string) error {
	url := fmt.Sprintf("https://api.switch-bot.com/v1.0/devices/%s/status", deviceID)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return err
	}
	req.Header.Set("Authorization", token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var status StatusResponse
	if err := json.Unmarshal(body, &status); err != nil {
		return err
	}
	if status.StatusCode != 100 {
		return fmt.Errorf("API error: %s", status.Message)
	}

	// メトリクスを更新
	temperatureGauge.Set(status.Body.Temperature)
	humidityGauge.Set(status.Body.Humidity)

	log.Printf("Updated: Temp=%.2f°C Humidity=%.2f%%\n",
		status.Body.Temperature, status.Body.Humidity)

	return nil
}

func main() {
	token := os.Getenv("SWITCHBOT_TOKEN")
	deviceID := os.Getenv("SWITCHBOT_DEVICE_ID")
	intervalStr := os.Getenv("INTERVAL_SECONDS")
	if token == "" || deviceID == "" {
		log.Fatal("SWITCHBOT_TOKEN and SWITCHBOT_DEVICE_ID must be set")
	}

	interval := 60 // default 60s
	if intervalStr != "" {
		fmt.Sscanf(intervalStr, "%d", &interval)
	}

	// 最初の取得
	if err := fetchData(token, deviceID); err != nil {
		log.Println("Initial fetch error:", err)
	}

	// 定期実行
	go func() {
		ticker := time.NewTicker(time.Duration(interval) * time.Second)
		defer ticker.Stop()

		for range ticker.C {
			if err := fetchData(token, deviceID); err != nil {
				log.Println("Fetch error:", err)
			}
		}
	}()

	// /metrics エンドポイント
	http.Handle("/metrics", promhttp.Handler())
	log.Println("Serving metrics at :8080/metrics")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
