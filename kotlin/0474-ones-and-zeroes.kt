/*
* Recursion with memoization solution
*/
class Solution {
    fun findMaxForm(strs: Array<String>, m: Int, n: Int): Int {
        val dp = Array(m + 1){ Array(n + 1){ IntArray(strs.size){ -1 } } }

        fun dfs(i: Int, m: Int, n: Int): Int {
            if(i == strs.size) return 0

            if(dp[m][n][i] != -1) return dp[m][n][i]

            val zeros = strs[i].count{ it == '0' }
            val ones = strs[i].count{ it == '1' }

            dp[m][n][i] = dfs(i + 1, m, n)
            if(zeros <= m && ones <= n) {
                dp[m][n][i] = maxOf(
                    dp[m][n][i],
                    1 + dfs(i + 1, m - zeros, n - ones)
                )
            }
        
            return dp[m][n][i]
        }

        return dfs(0, m, n)
    }
}

/*
* DP solution
*/
class Solution {
    fun findMaxForm(strs: Array<String>, m: Int, n: Int): Int {
        val dp = Array(m + 1){ IntArray(n + 1) }

        for(str in strs) {
            val zeros = str.count{ it == '0'}
            val ones = str.count{ it == '1'}
            for(i in m downTo zeros) {
                for(j in n downTo ones) {
                    dp[i][j] = maxOf(
                        1 + dp[i - zeros][j - ones], 
                        dp[i][j]
                    )
                }
            }
        }

        return dp[m][n]
    }
}
