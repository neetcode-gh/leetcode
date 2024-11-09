/**
 * Question Link: https://leetcode.com/problems/unique-paths-ii/
 */

 class Solution {
    func uniquePathsWithObstacles(_ obstacleGrid: [[Int]]) -> Int {
        let rows = obstacleGrid.count
        let cols = obstacleGrid[0].count
        var dp = [Int](repeating: 0, count: cols)
        dp[cols - 1] = 1

        for r in stride(from: rows - 1, to: -1, by: -1) {
            for c in stride(from: cols - 1, to: -1, by: -1) {
                if obstacleGrid[r][c] == 1 {
                    dp[c] = 0
                } else if c + 1 < cols {
                    dp[c] = dp[c] + dp[c + 1]
                }
            }
        }
        return dp[0]
    }
}