class ParkingSystem:

    def __init__(self, big: int, medium: int, small: int):
        self.bigLimit = big
        self.mediumLimit = medium
        self.smallLimit = small

    def addCar(self, carType: int) -> bool:

        if carType == 1:
            if self.bigLimit < 1:
                return False
            else:
                self.bigLimit -= 1
        elif carType == 2:
            if self.mediumLimit < 1:
                return False
            else:
                self.mediumLimit -= 1
        elif carType == 3:
            if self.smallLimit < 1:
                return False
            else:
                self.smallLimit -= 1
                
        return True


# Your ParkingSystem object will be instantiated and called as such:
# obj = ParkingSystem(big, medium, small)
# param_1 = obj.addCar(carType)
