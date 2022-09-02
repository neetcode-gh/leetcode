class Solution {
    fun canCompleteCircuit(gas: IntArray, cost: IntArray): Int {
        var sum = 0
        val n = gas.size

        for (i in 0..n-1) {
            sum += gas[i] - cost[i]
        }

        if (sum < 0)
            return -1

        var gasInTank = 0
        var start = 0

        for (i in 0..n-1) {
            gasInTank += gas[i] - cost[i]
            if (gasInTank < 0) {
                start = i+1
                gasInTank = 0
            }
        }

        return if (gasInTank < 0) -1 else start
    }
}