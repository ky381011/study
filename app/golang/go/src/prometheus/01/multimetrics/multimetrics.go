package main

import (
	"math/rand"
	"net/http"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// カスタム Collector
type MultiMetricCollector struct {
	tempDesc *prometheus.Desc
	humDesc  *prometheus.Desc
}

// コンストラクタ
func NewMultiMetricCollector() *MultiMetricCollector {
	return &MultiMetricCollector{
		tempDesc: prometheus.NewDesc(
			"sensor_temperature_celsius",
			"Temperature in Celsius",
			[]string{"device"}, nil,
		),
		humDesc: prometheus.NewDesc(
			"sensor_humidity_percent",
			"Humidity in percentage",
			[]string{"device"}, nil,
		),
	}
}

// Describe メソッド
func (c *MultiMetricCollector) Describe(ch chan<- *prometheus.Desc) {
	ch <- c.tempDesc
	ch <- c.humDesc
}

// Collect メソッド
func (c *MultiMetricCollector) Collect(ch chan<- prometheus.Metric) {
	devices := []string{"dev01", "dev02"}

	for _, device := range devices {
		temp := rand.Float64()*10 + 20 // 20〜30℃
		hum := rand.Float64()*20 + 40  // 40〜60%

		ch <- prometheus.MustNewConstMetric(
			c.tempDesc,
			prometheus.GaugeValue,
			temp,
			device,
		)
		ch <- prometheus.MustNewConstMetric(
			c.humDesc,
			prometheus.GaugeValue,
			hum,
			device,
		)
	}
}

func main() {
	prometheus.MustRegister(NewMultiMetricCollector())

	http.Handle("/metrics", promhttp.Handler())
	http.ListenAndServe(":2112", nil)
}

/*
# curl localhost:2112/metrics | grep 'sensor_'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  9020    0  9020    0     0  10.0M      0 --:--:-- --:--:-- --:--:-- 8808k
# HELP sensor_humidity_percent Humidity in percentage
# TYPE sensor_humidity_percent gauge
sensor_humidity_percent{device="dev01"} 54.526626587529435
sensor_humidity_percent{device="dev02"} 40.94296247783515
# HELP sensor_temperature_celsius Temperature in Celsius
# TYPE sensor_temperature_celsius gauge
sensor_temperature_celsius{device="dev01"} 22.398464225614653
sensor_temperature_celsius{device="dev02"} 28.12915549523654
*/
