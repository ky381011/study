package main

import (
	"fmt"
	"net/http"
)

type HogeHnadler struct{}
type FugaHnadler struct{}

func (h *HogeHnadler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "hoge\n")
}

func (h *FugaHnadler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "fuga\n")
}

func main() {
	hoge := HogeHnadler{}
	fuga := FugaHnadler{}

	server := http.Server{
		Addr:    ":8080",
		Handler: nil,
	}

	http.Handle("/hoge", &hoge)
	http.Handle("/fuga", &fuga)

	server.ListenAndServe()
}

/*
# curl http://localhost:8080/hoge
hoge
# curl http://localhost:8080/fuga
fuga
*/
