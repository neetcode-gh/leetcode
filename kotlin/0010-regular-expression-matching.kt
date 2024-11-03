//dp
class Solution {
    fun isMatch(s: String, p: String): Boolean {
        val dp = Array (s.length + 1) { BooleanArray (p.length + 1) }
        dp[0][0] = true

        for (i in 0..s.length) {
            for (j in 1..p.length) {
                if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 2] || (i > 0 && dp[i - 1][j] && (s[i - 1] == p[j - 2] || p[j - 2] == '.'))
                } else {
                    dp[i][j] = i > 0 && dp[i - 1][j - 1] && (s[i - 1] == p[j - 1] || p[j - 1] == '.')
                }
            }
        }
        
        return dp[s.length][p.length]
    }
}

//recursion + memoization
class Solution {
    fun isMatch(s: String, p: String): Boolean {
        val cache = Array (s.length + 1) { IntArray (p.length + 1) { -1 } }
        
        fun dfs(i: Int, j: Int): Int {
            if (i >= s.length && j >= p.length) 
                return 1
            if (j >= p.length) 
                return 0
            if (cache[i][j] != -1) 
                return cache[i][j]

            val charMatched = i < s.length && (s[i] == p[j] || p[j] == '.')

            if (j + 1 < p.length && p[j + 1] == '*')
                return if (dfs(i, j + 2) == 1 || charMatched && dfs(i + 1, j) == 1) 1 else 0
            if (charMatched) 
                return dfs(i + 1, j + 1)

            cache[i][j] == 0
            return 0
        }

        return dfs(0, 0) == 1
    }
}
