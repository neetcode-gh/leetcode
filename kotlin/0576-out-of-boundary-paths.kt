// Recursion + Memoization
class Solution {
    fun findPaths(m: Int, n: Int, maxMove: Int, startRow: Int, startColumn: Int): Int {
        val mod = 1_000_000_007
        val dirs = intArrayOf(0, 1, 0, -1, 0)
        val dp = Array (m) { Array (n) { LongArray (maxMove + 1) {  -1L } } }

        fun dfs(i: Int, j: Int, k: Int): Long {
            if (i < 0 || i == m || j < 0 || j == n) return 1L
            if (k == 0) return 0L
            if (dp[i][j][k] != -1L) return dp[i][j][k]

            dp[i][j][k] = 0
            for (n in 0..3)
                dp[i][j][k] = (dp[i][j][k] + dfs(i + dirs[n], j + dirs[n + 1], k - 1)) % mod

            return dp[i][j][k]
        }

        return dfs(startRow, startColumn, maxMove).toInt()
    }
}

// Bottom-up DP
class Solution {
    fun findPaths(m: Int, n: Int, maxMove: Int, startRow: Int, startColumn: Int): Int {
        val mod = 1_000_000_007
        val dirs = intArrayOf(0, 1, 0, -1, 0)
        val dp = Array (m) { Array (n) { LongArray (maxMove + 1) } }

        for (k in 1..maxMove) {
            for (i in 0 until m) {
                for (j in 0 until n) {
                    for (dir in 0..3) {
                        val i2 = i + dirs[dir]
                        val j2 = j + dirs[dir + 1]
                        if (i2 < 0 || i2 == m || j2 < 0 || j2 == n)
                            dp[i][j][k]++
                        else
                            dp[i][j][k] = (dp[i][j][k] + dp[i2][j2][k - 1]) % mod
                    }
                }
            }
        }

        return dp[startRow][startColumn][maxMove].toInt()
    }
}

// Top-down DP
class Solution {
    fun findPaths(m: Int, n: Int, maxMove: Int, startRow: Int, startColumn: Int): Int {
        val mod = 1_000_000_007
        val dirs = intArrayOf(0, 1, 0, -1, 0)
        val dp = Array(m) { Array(n) { LongArray(maxMove + 1) } }

        for (k in 1..maxMove) {
            for (i in m - 1 downTo 0) {
                for (j in n - 1 downTo 0) {
                    for (dir in 0..3) {
                        val i2 = i + dirs[dir]
                        val j2 = j + dirs[dir + 1]
                        if (i2 < 0 || i2 == m || j2 < 0 || j2 == n)
                            dp[i][j][k]++
                        else
                            dp[i][j][k] = (dp[i][j][k] + dp[i2][j2][k - 1]) % mod
                    }
                }
            }
        }

        return dp[startRow][startColumn][maxMove].toInt()
    }
}
