from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Hub2Body:
    deviceId: Optional[str] = None
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    firmwareVersion: Optional[str] = None
    lightLevel: Optional[str] = None
    heatIndex: Optional[float] = None
    signalStrength: Optional[int] = None

@dataclass
class Hub2Status:
    statusCode: Optional[int] = None
    message: Optional[str] = None
    body: Hub2Body = field(default_factory=Hub2Body)


    