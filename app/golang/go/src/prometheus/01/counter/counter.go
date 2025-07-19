package main

import (
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var myCounter = prometheus.NewCounter(
	prometheus.CounterOpts{
		Name: "my_test_counter",
		Help: "A counter used for test purposes",
	},
)

func main() {
	prometheus.MustRegister(myCounter)

	// カウンターを1秒ごとにインクリメント
	go func() {
		for {
			myCounter.Inc()
			time.Sleep(1 * time.Second)
		}
	}()

	// /metrics エンドポイントを公開
	http.Handle("/metrics", promhttp.Handler())
	http.ListenAndServe(":2112", nil)
}

/*
# curl -s http://localhost:2112/metrics | grep 'my_test_counter'
# HELP my_test_counter A counter used for test purposes
# TYPE my_test_counter counter
my_test_counter 147
*/
