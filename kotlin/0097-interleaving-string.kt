//DP 
class Solution {
    fun isInterleave(s1: String, s2: String, s3: String): Boolean {

        val dp = Array(s1.length + 1) { BooleanArray(s2.length + 1) }
        val n = s1.length
        val m = s2.length

        if(n + m != s3.length) return false

        dp[n][m] = true

        for (i in n downTo 0) {
            for (j in m downTo 0) {
                if (i < n && s1[i] == s3[i+j] && dp[i + 1][j])
                    dp[i][j] = true
                if (j < m && s2[j] == s3[i+j] && dp[i][j + 1])
                    dp[i][j] = true
            }
        }
    
        return dp[0][0]
    }
}

//DFS with memoization
class Solution {
    fun isInterleave(s1: String, s2: String, s3: String): Boolean {

        if(s1.length + s2.length != s3.length) return false

        val memo = Array(s1.length + 1) { BooleanArray(s2.length + 1) }
        val n = s1.length
        val m = s2.length

        fun dfs(i: Int, j: Int): Boolean {

            if (i == n && j == m) return true
            if (memo[i][j] == true) return false

            if (i < n && s1[i] == s3[i+j]) {
                if (dfs(i + 1, j))
                    return true
            }
            if (j < m && s2[j] == s3[i+j]) {
                if (dfs(i, j + 1))
                    return true
            }
         
            memo[i][j] = true
            return false
        }

        return dfs(0,0)
    }
}
