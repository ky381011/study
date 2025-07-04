package main

import (
	"fmt"
	"net/http"
)

type HelloHandler struct{}

func (h *HelloHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, World!!\n")
}

func main() {
	handler := HelloHandler{}
	server := http.Server{
		Addr:    ":8080",
		Handler: &handler,
	}
	server.ListenAndServe()
}

/*
# curl http://localhost:8080
Hello, World!!
*/
