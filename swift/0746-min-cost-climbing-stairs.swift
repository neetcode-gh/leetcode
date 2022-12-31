class Solution {
    func minCostClimbingStairs(_ cost: [Int]) -> Int {
        var stepsCost = cost
        for i in stride(from: cost.count - 3, through: 0, by: -1) {
            stepsCost[i] += min(stepsCost[i + 1], stepsCost[i + 2])
        }
        return min(stepsCost[0], stepsCost[1])
    }
}