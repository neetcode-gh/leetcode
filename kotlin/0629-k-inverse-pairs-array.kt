// Bottom-up DP, Time O(n^2 * k) and Space O(n * k)
class Solution {
    fun kInversePairs(n: Int, k: Int): Int {
        val mod = 1_000_000_007
        val dp = Array (n + 1) { LongArray (k + 1) }

        dp[0][0] = 1
        for (i in 1..n) {
            for (j in 0..k) {
                for (p in 0 until i) {
                    if (j - p >= 0)
                        dp[i][j] = (dp[i][j] + dp[i - 1][j - p]) % mod
                }
            }
        }

        return dp[n][k].toInt()
    }
}

// Space optimized Bottom-up DP, Time O(n^2 * k) and Space O(k)
class Solution {
    fun kInversePairs(n: Int, k: Int): Int {
        val mod = 1_000_000_007
        var dp = LongArray (k + 1)

        dp[0] = 1
        for (i in 1..n) {
            val newDp = LongArray (k + 1)
            for (j in 0..k) {
                for (p in 0 until i) {
                    if (j - p >= 0)
                        newDp[j] = (newDp[j] + dp[j - p]) % mod
                }
            }
            dp = newDp
        }

        return dp[k].toInt()
    }
}

// Space optimized DP + Sliding window Time O(n * k) and Space O(k)
class Solution {
    fun kInversePairs(n: Int, k: Int): Int {
        val mod = 1_000_000_007
        var prev = LongArray (k + 1)

        prev[0] = 1
        for (i in 1..n) {
            val cur = LongArray (k + 1)
            var total = 0L
            for (j in 0..k) {
                if (j >= i)
                    total -= prev[j - i]
                total = (total + prev[j] + mod) % mod
                cur[j] = total
            }
            prev = cur
        }

        return prev[k].toInt()
    }
}
