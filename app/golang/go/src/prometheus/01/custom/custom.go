package main

import (
	"flag"
	"log"
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// Metricsの定義
const (
	namespace = "SampleMetric"
)

type myCollector struct{} // 今回働いてくれるインスタンス

// metricsの記述子 「metricsの中に埋め込む情報の1つ（名前、#HELP に乗せる情報）であり、後にグラフで表示させるための数値以外のもの」

var (
	exampleCount = prometheus.NewCounter(prometheus.CounterOpts{
		Namespace: namespace,
		Name:      "example_count",
		Help:      "example counter help",
	})
	exampleGauge = prometheus.NewGauge(prometheus.GaugeOpts{
		Namespace: namespace,
		Name:      "example_gauge",
		Help:      "example gauge help",
	})
)

// Describe と Collect

func (c myCollector) Describe(ch chan<- *prometheus.Desc) {
	ch <- exampleCount.Desc()
	ch <- exampleGauge.Desc()
}

func (c myCollector) Collect(ch chan<- prometheus.Metric) {
	exampleValue := float64(12345)

	now := time.Now()

	h := now.Hour()
	m := now.Minute()
	s := now.Second()
	exampleTime := float64(h*10000 + m*100 + s)

	ch <- prometheus.MustNewConstMetric(
		exampleCount.Desc(),     //ここと
		prometheus.CounterValue, //ここは固定
		float64(exampleValue),   //ここが、グラフに表示させたい数値
	)
	ch <- prometheus.MustNewConstMetric(
		exampleGauge.Desc(),
		prometheus.GaugeValue,
		float64(exampleTime),
	)
}

var addr = flag.String("listen-address", "127.0.0.1:5000", "The address to listen on for HTTP requests.")

func main() {
	flag.Parse()

	var c myCollector
	prometheus.MustRegister(c)

	http.Handle("/metrics", promhttp.Handler())
	log.Fatal(http.ListenAndServe(*addr, nil))
}

/*
# curl -s http://localhost:5000/metrics | grep 'example_'
# HELP SampleMetric_example_count example counter help
# TYPE SampleMetric_example_count counter
SampleMetric_example_count 12345
# HELP SampleMetric_example_gauge example gauge help
# TYPE SampleMetric_example_gauge gauge
SampleMetric_example_gauge 121223
*/
