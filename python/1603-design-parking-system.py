class ParkingSystem:

    def __init__(self, big: int, medium: int, small: int):
        
        # [total_occupied, max_capacity]
        self.parking = {
            1: [0 ,big],
            2: [0, medium],
            3: [0, small]
        }

    def addCar(self, carType: int) -> bool:
        new_total = self.parking[carType][0] + 1
        if new_total <= self.parking[carType][1]:
            self.parking[carType][0] += 1
            return True
        return False
