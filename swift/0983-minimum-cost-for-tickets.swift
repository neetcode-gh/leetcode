/**
 * Question Link: https://leetcode.com/problems/minimum-cost-for-tickets/
 */

 class Solution {
    func mincostTickets(_ days: [Int], _ costs: [Int]) -> Int {
        var dp = [Int: Int]()

        for i in stride(from: days.count - 1, to: -1, by: -1) {
            dp[i] = 10000
            for (d, c) in zip([1, 7 ,30], costs) {
                var j = i
                while j < days.count && days[j] < days[i] + d {
                    j += 1
                }
                dp[i] = min(dp[i] ?? 0, c + (dp[j] ?? 0))
            }
        }

        return dp[0] ?? 0
    }
}