/*
* DP bottom up
*/
class Solution {
    fun numDistinct(s: String, t: String): Int {
        val dp = Array(s.length + 1) { IntArray(t.length + 1) }

        for (i in 0..s.length)
            dp[i][t.length] = 1

        for (i in s.length - 1 downTo 0) {
            for (j in t.length - 1 downTo 0) {
                if (s[i] == t[j])
                    dp[i][j] += (dp[i + 1][j + 1] + dp[i + 1][j])
                else
                    dp[i][j] += dp[i + 1][j]
            }
        }

        return dp[0][0]
    }
}

/*
* DFS + Memoization
*/
class Solution {
    fun numDistinct(s: String, t: String): Int {
        val memo = Array(s.length) { IntArray(t.length) { -1 } }

        fun dfs(i: Int, j: Int): Int {
            if (j == t.length) return 1
            if (i == s.length) return 0      
            if (memo[i][j] != -1) return memo[i][j]

            if (s[i] == t[j])
                memo[i][j] = dfs(i + 1, j + 1) + dfs(i + 1, j)
            else
                memo[i][j] = dfs(i + 1, j)
            
            return memo[i][j]
        }

        return dfs(0, 0)
    }
}
