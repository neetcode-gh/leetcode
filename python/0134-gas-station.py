class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        total_gas = 0
        remaining_gas = 0
        start_index = 0

        for i in range(len(gas)):
            total_gas += gas[i] - cost[i]
            remaining_gas += gas[i] - cost[i]

            if remaining_gas < 0:
                remaining_gas = 0
                start_index = i + 1

        if total_gas >= 0:
            return start_index
        else:
            return -1
