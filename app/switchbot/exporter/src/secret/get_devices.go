package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type DeviceListResponse struct {
	StatusCode int    `json:"statusCode"`
	Message    string `json:"message"`
	Body       struct {
		DeviceList []struct {
			DeviceId     string `json:"deviceId"`
			DeviceName   string `json:"deviceName"`
			DeviceType   string `json:"deviceType"`
			HubDeviceId  string `json:"hubDeviceId"`
		} `json:"deviceList"`
	} `json:"body"`
}

func main() {
	token := os.Getenv("SWITCHBOT_TOKEN")
	if token == "" {
		log.Fatal("環境変数 SWITCHBOT_TOKEN が未設定です。")
	}

	// APIリクエスト作成
	req, err := http.NewRequest("GET", "https://api.switch-bot.com/v1.1/devices", nil)
	if err != nil {
		log.Fatalf("リクエスト作成エラー: %v", err)
	}
	req.Header.Set("Authorization", token)
	req.Header.Set("Content-Type", "application/json")

	// HTTPクライアントで実行
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("APIリクエスト失敗: %v", err)
	}
	defer resp.Body.Close()

	// レスポンス読み込み
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("レスポンス読み込み失敗: %v", err)
	}

	// JSONパース
	var devices DeviceListResponse
	if err := json.Unmarshal(body, &devices); err != nil {
		log.Fatalf("JSONパース失敗: %v", err)
	}

	// ファイルにJSONを書き込む
	jsonBytes, err := json.MarshalIndent(devices, "", "  ")
	if err != nil {
		log.Fatalf("JSON変換失敗: %v", err)
	}

	if err := ioutil.WriteFile("devices.json", jsonBytes, 0644); err != nil {
		log.Fatalf("ファイル書き込み失敗: %v", err)
	}

	fmt.Println("✅ デバイス一覧を devices.json に出力しました。")
}
