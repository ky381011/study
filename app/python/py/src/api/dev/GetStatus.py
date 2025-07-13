from abc import ABCMeta, abstractmethod

class GetStatus(metaclass=ABCMeta):
    @abstractmethod
    def getStatus(self):
        pass