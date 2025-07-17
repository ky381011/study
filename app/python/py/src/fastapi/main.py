from fastapi import FastAPI
import uvicorn
import os
import sys
import json

from Switchbot import GetSwitchbotStatus

app = FastAPI()

DEVICE_ID_ENV = sys.argv[1]

device_id = os.getenv(DEVICE_ID_ENV)

exporter = GetSwitchbotStatus(device_id=device_id)

status = exporter.getStatus()

temperature = status["body"]["temperature"]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/switchbot")
async def root():
    return {"message": temperature}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")