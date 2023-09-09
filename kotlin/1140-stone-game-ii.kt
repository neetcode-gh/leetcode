class Solution {
    fun stoneGameII(piles: IntArray): Int {
        val dp = Array (2) { Array (piles.size) { IntArray (piles.size + 1) } }

        fun bfs(a: Int, i: Int, m: Int): Int {
            if (i == piles.size)
                return 0
            if (dp[a][i][m] != 0)
                return dp[a][i][m]

            var res = if (a == 0) 0 else Integer.MAX_VALUE
            var total = 0
            for (x in 1..(2 * m)) {
                if (i + x > piles.size)
                    break
                total += piles[i + x - 1]
                if (a == 0)
                    res = maxOf(res, total + bfs(1, i + x, maxOf(m, x)))
                else
                    res = minOf(res, bfs(0, i + x, maxOf(m, x)))
            }

            dp[a][i][m] = res
            return dp[a][i][m] 
        }

        return bfs(0, 0, 1)
    }
}
