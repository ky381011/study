FROM node:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y bash curl git nodejs npm && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

CMD ["sleep", "infinity"]