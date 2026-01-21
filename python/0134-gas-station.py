class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        start, end = len(gas) - 1, 0

        #What is happening is that we cannot start from the last index if fuel and cost both are 0
        #So we set the start to index where either of fuel and cost are not 0
        while(gas[start] == 0 and cost[start]==0):
            start -= 1

        total = gas[start] - cost[start]

        while start >= end:
            while total < 0 and start >= end:
                start -= 1
                total += gas[start] - cost[start]
            if start == end:
                return start
            total += gas[end] - cost[end]
            end += 1
        return -1
