class Solution {
    fun maxAlternatingSum(nums: IntArray): Long {
        val dp = Array (2) { LongArray (nums.size) { -1L } }

        fun dfs(i: Int, even: Int): Long {
            if (i == nums.size)
                return 0
            if (dp[even][i] != -1L)
                return dp[even][i]

            var sum = if (even == 1) nums[i] else -1 * nums[i]
            dp[even][i] = maxOf(
                sum + dfs(i + 1, if (even == 1) 0 else 1),
                dfs(i + 1, even)
            )

            return dp[even][i]
        }

        return dfs(0, 1)
    }
}
