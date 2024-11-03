class Solution {
    fun numWays(words: Array<String>, target: String): Int {
        val mod = 1000000000 + 7
        val m = words[0].length
        val n = target.length
        
        val count = Array(m){IntArray(26)}
        for (w in words) {
            for ((i, c) in w.withIndex()) {
                count[i][c - 'a'] += 1
            }
        }
        
        val dp = Array(n){LongArray(m){-1L}}

        fun dfs(i: Int, k: Int): Long {
            if (i == n)
                return 1L
            if (k == m)
                return 0L
            if (dp[i][k] != -1L)
                return dp[i][k]

            val c = target[i]
            dp[i][k] = dfs(i, k + 1)
            if(count[k][c - 'a'] != 0)
                dp[i][k] += count[k][c - 'a'] * dfs(i + 1, k + 1)

            return dp[i][k] % mod
        }

        return dfs(0, 0).toInt()
    }
}
