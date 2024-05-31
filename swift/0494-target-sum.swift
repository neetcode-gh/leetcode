/**
 * Question Link: https://leetcode.com/problems/target-sum/
 */

 class Solution {
    func findTargetSumWays(_ nums: [Int], _ target: Int) -> Int {
        var dp = [[Int]: Int]()
        
        func dfs(_ i: Int, _ total: Int) -> Int {
            if i == nums.count {
                return total == target ? 1 : 0
            }
            if dp[[i, total]] != nil {
                return dp[[i, total]]!
            }
            dp[[i, total]] = dfs(i + 1, total + nums[i]) + dfs(i + 1, total - nums[i])
            return dp[[i, total]]!
        }

        return dfs(0, 0)
    }
}