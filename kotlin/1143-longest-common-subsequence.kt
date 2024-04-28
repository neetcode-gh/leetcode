class Solution {
	fun longestCommonSubsequence(text1: String, text2: String): Int {
		if (text1.isEmpty() || text2.isEmpty()) {
			return 0
		}

		val M = text1.length
		val N = text2.length

		val dp = Array(M + 1){IntArray(N + 1){0}}

		for (i in 1..M) {
			for (j in 1..N) {
				if (text1[i - 1] == text2[j - 1]) {
					dp[i][j] = dp[i - 1][j - 1] + 1
				} else {
					dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
				}
			}
		}
		return dp[M][N]
	}
}

/*
 * Different solutions
 */

 // Recursion + Memoization, Time Complexity of O(n * m) and space complexity of O(n * m)
class Solution {
    fun longestCommonSubsequence(t1: String, t2: String): Int {
        val n = t1.length
        val m = t2.length
        val dp = Array (n) { IntArray (m) { -1 } }

        fun dfs(i: Int, j: Int): Int {
            if (i == n || j == m) return 0
            if (dp[i][j] != -1) return dp[i][j]

            if (t1[i] == t2[j])
                dp[i][j] = 1 + dfs(i + 1, j + 1)
            else
                dp[i][j] = maxOf(dfs(i + 1, j), dfs(i, j + 1))

            return dp[i][j]
        }

        return dfs(0, 0)
    }
}

// Top down DP, Time Complexity of O(n * m) and space complexity of O(n * m)
class Solution {
    fun longestCommonSubsequence(t1: String, t2: String): Int {
        val n = t1.length
        val m = t2.length
        val dp = Array (n + 1) { IntArray (m + 1) }

        for (i in n - 1 downTo 0) {
            for (j in m - 1 downTo 0) {
                if (t1[i] == t2[j])
                    dp[i][j] = 1 + dp[i + 1][j + 1]
                else
                    dp[i][j] = maxOf(dp[i + 1][j], dp[i][j + 1])
            }
        }

        return dp[0][0]
    }
}

// Optimized DP (Works both for both Top-down and Bottom-up, but here we use bottom-up approach)
// Time Complexity of O(n * m) and space complexity of O(maxOf(n, m))
class Solution {
    fun longestCommonSubsequence(t1: String, t2: String): Int {
        val m = t1.length
        val n = t2.length
        if (m < n) return longestCommonSubsequence(t2, t1)

        var dp = IntArray (n + 1)

        for (i in m downTo 0) {
            var newDp = IntArray (n + 1)
            for (j in n downTo 0) {
                if (i == m || j == n) {
                    newDp[j] = 0
                } else if (t1[i] == t2[j]) {
                    newDp[j] = 1 + dp[j + 1]
                } else {
                    newDp[j] = maxOf(dp[j], newDp[j + 1])
                }
            }
            dp = newDp
        }

        return dp[0]
    }
}
