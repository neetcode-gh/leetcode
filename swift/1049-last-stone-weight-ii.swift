/**
 * Question Link: https://leetcode.com/problems/last-stone-weight-ii/
 */

 class Solution {
    func lastStoneWeightII(_ stones: [Int]) -> Int {
        let stoneSum = stones.reduce(0, +)
        let target = stoneSum / 2
        var dp = [[Int]: Int]()

        func dfs(_ i: Int, _ total: Int) -> Int {
            if total >= target || i == stones.count {
                return abs(total - (stoneSum - total))
            }
            if dp[[i, total]] != nil {
                return dp[[i, total]]!
            }
            dp[[i, total]] = min(dfs(i + 1, total), dfs(i + 1, total + stones[i]))
            return dp[[i, total]]!
        }

        return dfs(0, 0)
    }
}