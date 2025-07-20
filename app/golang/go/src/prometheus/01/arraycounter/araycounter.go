package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// カウンターの数
const counterCount = 3

var counters []prometheus.Counter

func init() {
	for i := 0; i < counterCount; i++ {
		counter := prometheus.NewCounter(prometheus.CounterOpts{
			Name: fmt.Sprintf("test_counter_%d", i),
			Help: fmt.Sprintf("Test counter number %d", i),
		})
		prometheus.MustRegister(counter)
		counters = append(counters, counter)
	}
}

func main() {
	go func() {
		for {
			for i, c := range counters {
				c.Add(float64(i + 1)) // インデックスに応じた加算
			}
			time.Sleep(1 * time.Second)
		}
	}()

	http.Handle("/metrics", promhttp.Handler())
	http.ListenAndServe(":2112", nil)
}

/*
# curl -s http://localhost:2112/metrics | grep 'test_counter_'
# HELP test_counter_0 Test counter number 0
# TYPE test_counter_0 counter
test_counter_0 51
# HELP test_counter_1 Test counter number 1
# TYPE test_counter_1 counter
test_counter_1 102
# HELP test_counter_2 Test counter number 2
# TYPE test_counter_2 counter
test_counter_2 153
*/
