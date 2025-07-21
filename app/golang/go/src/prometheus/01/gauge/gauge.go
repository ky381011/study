package main

import (
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var myGauge = prometheus.NewGauge(
	prometheus.GaugeOpts{
		Name: "my_test_gauge",
		Help: "A counter used for test purposes",
	},
)

func main() {
	prometheus.MustRegister(myGauge)

	// 数値を1秒ごとにインクリメント
	go func() {
		var count = 0
		for {
			count++
			myGauge.Set(float64(count))
			time.Sleep(1 * time.Second)
		}
	}()

	// /metrics エンドポイントを公開
	http.Handle("/metrics", promhttp.Handler())
	http.ListenAndServe(":2112", nil)
}

/*
# curl -s http://localhost:2112/metrics | grep 'my_test_gauge'
# HELP my_test_gauge A counter used for test purposes
# TYPE my_test_gauge gauge
my_test_gauge 19
*/
