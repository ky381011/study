FROM golang:1.22-alpine

WORKDIR /app

COPY src/go.mod src/go.sum ./
RUN go mod download

COPY src .

RUN go build -o exporter .

CMD ["./exporter"]
