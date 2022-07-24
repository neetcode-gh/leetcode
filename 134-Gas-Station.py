class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        if sum(gas) < sum(cost):
            return -1
        
        res = 0
        total = 0
        for i in range(len(gas)):
            total += gas[i] - cost[i]
            
            if total < 0:
                total = 0
                res = i + 1

        return res
