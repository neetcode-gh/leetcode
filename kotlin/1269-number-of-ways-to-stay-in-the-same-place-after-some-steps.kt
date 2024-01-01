// Optimized DP solution Time O(minOf(steps, arrLen)^2, and space optimized down from O(minOf(steps, arrLen)^2) to O(minOf(steps, arrLen))
class Solution {
    fun numWays(steps: Int, _arrLen: Int): Int {
        val mod = 1_000_000_000 + 7
        val arrLen = minOf(steps, _arrLen)
        var dp = IntArray (arrLen)
        
        dp[0] = 1

        for (step in 1..steps) {
            val nextDp = IntArray (arrLen)
            for (i in 0 until arrLen) {
                nextDp[i] = dp[i]
                if (i > 0)
                    nextDp[i] = (nextDp[i] + dp[i - 1]) % mod
                if (i < arrLen - 1)
                    nextDp[i] = (nextDp[i] + dp[i + 1]) % mod
            }
            dp = nextDp
        }
        
        return dp[0]
    }
}

/* Recursion + memoization, Time O(minOf(steps, arrLen)^2 and space O(minOf(steps, arrLen)^2
 * Here we use arrays for memoization, however, we set the 2D array's size to [steps + 1][steps + 1] because:
* 1) we can never move more than "steps" amount to the right, and we have constraints 1 <= steps <= 500 and 1 <= arrLen <= 10^6,
* so we can therefor make an optimization since we dont need all that extra space, and 2) it will not AC on Leetcode since they are looking for this optimisation.
*/
class Solution {
    fun numWays(steps: Int, arrLen: Int): Int {
        val mod = 1_000_000_000 + 7
        val dp = Array (steps + 1) { IntArray (steps + 1) { -1 } }

        fun dfs(i: Int, left: Int): Int {
            if (i < 0 || i == arrLen) return 0
            if (left == 0) {
                if (i == 0) return 1
                else return 0
            }
            if (dp[i][left] != -1) return dp[i][left]

            var res = 0
            res = (res + dfs(i - 1, left - 1)) % mod
            res = (res + dfs(i + 1, left - 1)) % mod
            res = (res + dfs(i, left - 1)) % mod

            dp[i][left] = res
            return res
        }

        return dfs(0, steps)
    }
}
