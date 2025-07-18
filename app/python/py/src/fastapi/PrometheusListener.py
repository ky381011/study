import argparse
import requests
import json

def main():
    parser = argparse.ArgumentParser(description="Fetch Prometheus targets")
    parser.add_argument('-u', '--url', required=True, help="Prometheus API URL (e.g. http://192.168.0.200:9090/api/v1/targets)")
    args = parser.parse_args()

    try:
        response = requests.get(args.url)

        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: HTTP {response.status_code}")
            print(response.text)

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    main()
