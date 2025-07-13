import sys
import json

from dev.Switchbot import GetSwitchbotStatus
from dev.OpenWeatherAPI import WeatherFetcher

args = sys.argv

classes = {
    "switchbot": GetSwitchbotStatus,
    "weather": WeatherFetcher,
}

target = sys.argv[1]
cls = classes.get(target)



if cls is None:
    print(f"未知のターゲット: {target}")
    sys.exit(1)

instance = cls(args[2])
status = instance.getStatus()

print(json.dumps(status, indent=2))

