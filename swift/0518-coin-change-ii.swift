/**
 * Question Link: https://leetcode.com/problems/coin-change-ii/
 */

 class Solution {
    func change(_ amount: Int, _ coins: [Int]) -> Int {
        var dp = [Int](repeating: 0, count: amount + 1)
        dp[0] = 1

        for i in stride(from: coins.count - 1, to: -1, by: -1) {
            var nextDP = [Int](repeating: 0, count: amount + 1)
            nextDP[0] = 1

            for a in 1..<amount + 1 {
                nextDP[a] = dp[a]
                if a - coins[i] >= 0 {
                    nextDP[a] += nextDP[a - coins[i]]
                }
            }

            dp = nextDP
        }

        return dp[amount]
    }
}