FROM golang:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y bash curl tree git nodejs npm && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN go install golang.org/x/tools/gopls@latest

CMD ["sleep", "infinity"]
