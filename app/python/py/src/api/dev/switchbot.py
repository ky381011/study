import os
import time
import uuid
import hmac
import hashlib
import base64
import requests

class GetSwitchbotStatus():
    """
    Getting Hub 2 status using SwitchBot API v1.1
    """

    def __init__(self, device_id: str):
        self.token = os.getenv("SWITCHBOT_TOKEN")
        self.secret = os.getenv("SWITCHBOT_SECRET")
        if not self.token or not self.secret:
            raise ValueError("SWITCHBOT_TOKEN または SWITCHBOT_SECRET が環境変数に設定されていません")

        self.device_id = device_id
        self.nonce = str(uuid.uuid4())
        self.t = int(round(time.time() * 1000))

        string_to_sign = f"{self.token}{self.t}{self.nonce}".encode("utf-8")
        secret_bytes = self.secret.encode("utf-8")

        self.sign = base64.b64encode(
            hmac.new(secret_bytes, msg=string_to_sign, digestmod=hashlib.sha256).digest()
        )

    def _create_header(self) -> dict:
        return {
            "Authorization": self.token,
            "Content-Type": "application/json",
            "charset": "utf8",
            "t": str(self.t),
            "sign": self.sign.decode("utf-8"),
            "nonce": self.nonce,
        }

    def get_status(self) -> dict:
        url = f"https://api.switch-bot.com/v1.1/devices/{self.device_id}/status"
        headers = self._create_header()

        response = requests.get(url, headers=headers)

        if response.status_code != 200:
            raise RuntimeError(f"APIリクエスト失敗: {response.status_code} - {response.text}")

        return response.json()

import json

if __name__ == "__main__":
    hub2_id = os.environ["SWITCHBOT_HUB2_ID"]
    plug_mini_id = os.environ["SWITCHBOT_PLUG_MINI_MAIN_ID"]
    hub2_status = GetSwitchbotStatus(hub2_id).get_status()
    plug_mini_status = GetSwitchbotStatus(plug_mini_id).get_status()

    print(json.dumps(hub2_status, indent=2))
    print(json.dumps(plug_mini_status, indent=2))