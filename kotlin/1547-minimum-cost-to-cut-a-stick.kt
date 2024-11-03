class Solution {
    fun minCost(n: Int, c: IntArray): Int {
        val cuts = c.toCollection(ArrayList()).apply {
            add(0)
            add(n)
            sort()
        }

        val dp = Array (cuts.size) { IntArray (cuts.size) { -1 } }

        fun dfs(l: Int, r: Int): Int {
            if (r - l <= 1)
                return 0
            if (dp[l][r] == -1) {
                dp[l][r] = Integer.MAX_VALUE
                for (c in l + 1 until r) {
                    dp[l][r] = minOf(
                        dp[l][r], 
                        dfs(l, c) + dfs(c, r) + (cuts[r] - cuts[l])
                    )
                }
            }    

            return dp[l][r]    
        }
    
        return dfs(0, cuts.lastIndex)
    } 
}
