class UndergroundSystem:
    def __init__(self):
        # save as {customer_id: (stationName, t)}
        self.customer = {}
        
        # save time travel for route = (src,dst) each time a customer checkout
        # save as {(src, dst): (total_time, count)}
        self.time = {}

    def checkIn(self, id: int, stationName: str, t: int) -> None:
        self.customer[id] = (stationName, t)

    def checkOut(self, id: int, stationName: str, t: int) -> None:
        start, time = self.customer[id]
        route = (start, stationName)

        # save new entity to time table
        if route not in self.time: self.time[route] = [0,0]
        self.time[route][0] += t - time
        self.time[route][1] += 1


    def getAverageTime(self, startStation: str, endStation: str) -> float:
        total, count = self.time[(startStation, endStation)]
        return total / count
