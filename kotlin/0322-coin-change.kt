// DP
class Solution {
    fun coinChange(coins: IntArray, amount: Int): Int {
        val dp = IntArray (amount + 1) { amount + 1 }
        dp[0] = 0
        for (i in 0..amount) {
            for (j in 0 until coins.size) {
                if (coins[j] <= i) {
                    dp[i] = minOf(dp[i], dp[i - coins[j]] + 1)
                }
            }
        }
        return if (dp[amount] > amount) -1 else dp[amount]
    }
}

// Recursion + memoization
class Solution {
    fun coinChange(coins: IntArray, amount: Int): Int {
        val dp = IntArray (amount + 1) { -1 }

        fun dfs(amount: Int): Int {
            if (amount == 0) return 0
            if (dp[amount] != -1) return dp[amount]

            var res = Integer.MAX_VALUE
            for (coin in coins) {
                if (amount - coin >= 0) {
                    var count = dfs(amount - coin)
                    if (count != Integer.MAX_VALUE)
                        res = minOf(res, count + 1)
                }
            }

            dp[amount] = res
            return res
        }

        val res = dfs(amount)
        return if (res == Integer.MAX_VALUE) -1 else res
    }
}
