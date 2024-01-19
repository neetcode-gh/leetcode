class Solution {
    fun maxCoins(_nums: IntArray): Int {
        val nums = intArrayOf(1) + _nums + intArrayOf(1)
        val n = nums.size
        val dp = Array (n) { IntArray (n) { -1 } }
        
        fun dfs(l: Int, r: Int): Int {
            if (l > r) return 0
            if (dp[l][r] != -1) return dp[l][r]

            for (i in l..r) {
                var coins = nums[l - 1] * nums[i] * nums[r + 1]
                coins += dfs(l, i - 1) + dfs(i + 1, r)
                dp[l][r] = maxOf(dp[l][r], coins)
            }

            return dp[l][r]
        }
        
        return dfs(1, n - 2)
    }
}
