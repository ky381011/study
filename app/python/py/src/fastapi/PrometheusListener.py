import argparse
import requests
import json

def query_prometheus(prometheus_url, metric_name):
    url = f"{prometheus_url}/api/v1/query"
    params = {
        'query': metric_name
    }

    try:
        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: HTTP {response.status_code}")
            print(response.text)

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Query Prometheus for SwitchBot data")
    parser.add_argument('--url', required=True, help="Prometheus base URL (e.g. http://10.10.10.20:9090)")
    parser.add_argument('--metric', required=True, help="Metric name to query (e.g. switchbot_temperature)")
    args = parser.parse_args()

    query_prometheus(args.url, args.metric)

'''
# python PrometheusListener.py --url http://xx.xx.xx.xx:yyyy --metric EXPORTER_NAME
{
  "status": "success",
  "data": {
    "resultType": "vector",
    "result": [
      {
        "metric": {
          "__name__": "sEXPORTER_NAME",
          "instance": "xxxx",
          "job": "switchbot_exporter"
        },
        "value": [
          1752846028.853,
          "27.3"
        ]
      }
    ]
  }
}
'''