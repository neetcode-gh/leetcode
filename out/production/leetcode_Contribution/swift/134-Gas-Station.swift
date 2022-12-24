class Solution {
    func canCompleteCircuit(_ gas: [Int], _ cost: [Int]) -> Int {
        if gas.reduce(0, +) < cost.reduce(0, +) {
            return -1
        }
        var start = gas.count - 1, end = 0
        var total = gas[start] - cost[start]
        
        while start >= end {
            while total < 0 && start >= end {
                start -= 1
                total += gas[start] - cost[start]
            }
            if start == end {
                return start
            }
            total += gas[end] - cost[end]
            end += 1
        }
        return -1
    }
}