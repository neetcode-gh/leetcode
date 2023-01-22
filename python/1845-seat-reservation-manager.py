import heapq

class SeatManager:

    def __init__(self, n: int):
        self.seats = [i for i in range(1, n + 1)]

    def reserve(self) -> int:
        return heapq.heappop(self.seats)

    def unreserve(self, seatNumber: int) -> None:
        heapq.heappush(self.seats, seatNumber)