package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
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

// Prometheus metrics
var (
	temperatureGauge = prometheus.NewGauge(
		prometheus.GaugeOpts{
			Name: "switchbot_temperature_celsius",
			Help: "Current temperature reported by SwitchBot Hub 2.",
		},
	)
	humidityGauge = prometheus.NewGauge(
		prometheus.GaugeOpts{
			Name: "switchbot_humidity_percent",
			Help: "Current humidity reported by SwitchBot Hub 2.",
		},
	)
	plugPowerGauge = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "switchbot_plug_power_watts",
			Help: "Current power consumption (W) of Plug Mini.",
		},
		[]string{"device"},
	)
	plugVoltageGauge = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "switchbot_plug_voltage_volts",
			Help: "Voltage (V) measured by Plug Mini.",
		},
		[]string{"device"},
	)
	plugElectricityGauge = prometheus.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "switchbot_plug_electricity_day_wh",
			Help: "Electricity usage (Wh) of the day by Plug Mini.",
		},
		[]string{"device"},
	)
)

func init() {
	prometheus.MustRegister(temperatureGauge)
	prometheus.MustRegister(humidityGauge)
	prometheus.MustRegister(plugPowerGauge)
	prometheus.MustRegister(plugVoltageGauge)
	prometheus.MustRegister(plugElectricityGauge)
}

func getHub2Status(token string, deviceID string) (*Hub2Status, error) {
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

	var status Hub2Status
	if err := json.Unmarshal(bodyBytes, &status); err != nil {
		return nil, err
	}

	return &status, nil
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

func updateMetrics(token, deviceID string, plugIDs []string) {
	status, err := getHub2Status(token, deviceID)
	if err != nil {
		log.Printf("メトリクス更新失敗: %v", err)
		return
	}

	temperatureGauge.Set(status.Body.Temperature)
	humidityGauge.Set(status.Body.Humidity)

	log.Printf("メトリクス更新完了 - 温度: %.1f°C, 湿度: %.1f%%", status.Body.Temperature, status.Body.Humidity)

	// Plug Mini の電力
	for _, id := range plugIDs {
		status, err := getPlugMiniStatus(token, id)
		if err != nil {
			log.Printf("PlugMini (%s) メトリクス更新失敗: %v", id, err)
			continue
		}
		plugPowerGauge.WithLabelValues(id).Set(status.Body.Weight)
		plugVoltageGauge.WithLabelValues(id).Set(status.Body.Voltage)
		plugElectricityGauge.WithLabelValues(id).Set(status.Body.ElectricityOfDay)

		log.Printf("PlugMini (%s) - 消費電力: %.1fW, 電圧: %.1fV, 日消費電力: %.1fWh",
			id, status.Body.Weight, status.Body.Voltage, status.Body.ElectricityOfDay)
	}
}

func main() {
	token := os.Getenv("SWITCHBOT_TOKEN")
	hub2ID := os.Getenv("SWITCHBOT_HUB2_ID")
	plug1ID := os.Getenv("SWITCHBOT_PLUG_MINI_MAIN_ID")
	plug2ID := os.Getenv("SWITCHBOT_PLUG_MINI_SECOND_ID")

	if token == "" || hub2ID == "" {
		log.Fatal("SWITCHBOT_TOKEN などが未設定です")
	}

	plugIDs := []string{plug1ID, plug2ID}

	// 初回メトリクス更新
	updateMetrics(token, hub2ID, plugIDs)

	// メトリクス定期更新 (例: 60秒ごと)
	go func() {
		for {
			updateMetrics(token, hub2ID, plugIDs)
			time.Sleep(60 * time.Second)
		}
	}()

	// HTTPサーバ開始 (/metrics)
	http.Handle("/metrics", promhttp.Handler())
	log.Println("Exporter が :2112 で起動しました (/metrics)")
	log.Fatal(http.ListenAndServe(":2112", nil))
}
