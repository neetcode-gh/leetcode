class Solution {
    fun maxValueOfCoins(piles: List<List<Int>>, k: Int): Int {
        val n = piles.size
        val dp = Array(n){ IntArray(k+1){-1} }

        fun dfs(i: Int, coins: Int): Int {
            if (i == n)
                return 0
            if (dp[i][coins] != -1)
                return dp[i][coins]
            
            dp[i][coins] = dfs(i + 1, coins)

            var curPile = 0
            for (j in 0 until minOf(piles[i].size, coins)) {
                curPile += piles[i][j]
                dp[i][coins] = maxOf(
                    dp[i][coins], 
                    curPile + dfs(i + 1, coins - j - 1)
                )
            }

            return dp[i][coins]
        }

        return dfs(0, k)
    }
}
