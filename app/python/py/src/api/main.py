import sys

from dev import switchbot
from dev import OpenWeatherAPI

args = sys.argv

classes = {
    "hub2": switchbot,
    "plug": OpenWeatherAPI,
}

