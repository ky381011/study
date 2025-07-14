import sys
import json
import argparse

from dev.Switchbot import GetSwitchbotStatus
from dev.OpenWeatherAPI import WeatherFetcher

classes = {
    "switchbot": GetSwitchbotStatus,
    "weather": WeatherFetcher,
}

parser = argparse.ArgumentParser()

parser.add_argument('target_class', help='Which api to call')
parser.add_argument('-d', '--deviceId', help='Switchbot device id')
parser.add_argument('-c', '--city', help='Where to get weather information')

args = parser.parse_args()

target = args.target_class.lower()

cls = classes.get(target)

if target not in classes:
    print(f"Unsupported class '{target}'")
    sys.exit(1)

# Instantiate
if target == "switchbot":
    if not args.deviceId:
        print("Error: --deviceId is required for switchbot.")
        sys.exit(1)
    instance = classes[target](device_id=args.deviceId)

elif target == "weather":
    if not args.city:
        print("Error: --city is required for weather.")
        sys.exit(1)
    instance = classes[target](city=args.city)

# Call and display result
result = instance.getStatus()
print(json.dumps(result, indent=2))

