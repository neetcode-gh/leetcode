// DP top-dowm approach
class Solution {
    fun cherryPickup(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        var dp = Array (cols) { IntArray (cols) }

        for (r in (rows - 1) downTo 0) {
            val curDP = Array (cols) { IntArray (cols) }
            for (c1 in 0 until cols) {
                for (c2 in c1 + 1 until cols) {
                    var max = 0
                    val curPick = grid[r][c1] + grid[r][c2]
                    for (c12 in arrayOf(-1, 0, 1)) {
                        for (c22 in arrayOf(-1, 0, 1)) {
                            val nC1 = c1 + c12
                            val nC2 = c2 + c22
                            if (nC1 < 0 || nC2 == cols) continue
                            max = maxOf(
                                max,
                                curPick + dp[nC1][nC2]
                            )
                        }
                    }
                    curDP[c1][c2] = max
                }
            }
            dp = curDP
        }

        return dp[0][cols - 1]
    }
}

// Recursion + Memoization
class Solution {
    fun cherryPickup(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        val dp = HashMap<String, Int>()

        fun dfs(r: Int, c1: Int, c2: Int): Int {
            if (c1 == c2 || minOf(c1, c2) < 0 || maxOf(c1, c2) == cols) return 0
            dp["$r:$c1:$c2"]?.let { return it }
            if (r == rows - 1) return grid[r][c1] + grid[r][c2]

            var res = 0
            for (c12 in arrayOf(-1, 0, 1)) {
                for (c22 in arrayOf(-1, 0, 1)) {
                    res = maxOf(
                        res,
                        dfs(r + 1, c1 + c12, c2 + c22)
                    )
                }
            }

            res += grid[r][c1] + grid[r][c2]
            dp["$r:$c1:$c2"] = res
            return res
        }

        return dfs(0, 0, cols - 1)
    }
}
