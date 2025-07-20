package main

import (
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var singleCounter = prometheus.NewCounter(
	prometheus.CounterOpts{
		Name: "singleCounter",
		Help: "A counter used for test purposes",
	},
)

var doubleCounter = prometheus.NewCounter(
	prometheus.CounterOpts{
		Name: "doubleCounter",
		Help: "A counter used for test purposes",
	},
)

func main() {
	prometheus.MustRegister(singleCounter)
	prometheus.MustRegister(doubleCounter)

	go func() {
		for {
			// 1 up
			singleCounter.Inc()
			// 2 up
			doubleCounter.Add(2.0)
			time.Sleep(1 * time.Second)
		}
	}()

	// /metrics エンドポイントを公開
	http.Handle("/metrics", promhttp.Handler())
	http.ListenAndServe(":2112", nil)
}

/*
# curl -s http://localhost:2112/metrics | grep -E 'singleCounter|doubleCounter'
# HELP doubleCounter A counter used for test purposes
# TYPE doubleCounter counter
doubleCounter 14
# HELP singleCounter A counter used for test purposes
# TYPE singleCounter counter
singleCounter 7
*/
