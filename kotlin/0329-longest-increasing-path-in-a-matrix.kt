class Solution {
    fun longestIncreasingPath(matrix: Array<IntArray>): Int {
        val m = matrix.size
        val n = matrix[0].size
        val memo = Array<IntArray>(m){IntArray(n)}
        val dirs = arrayOf(intArrayOf(-1,0),intArrayOf(1,0),intArrayOf(0,1),intArrayOf(0,-1))
        var res = 1

        for (i in 0..m-1) {
            for (j in 0..n-1) {
                val len = dfs(matrix, i, j, dirs, memo)
                res = Math.max(res, len)
            }
        }

        return res
    }

    fun dfs(matrix: Array<IntArray>, row: Int, col: Int, dirs: Array<IntArray>, memo: Array<IntArray>): Int {
        val m = matrix.size
        val n = matrix[0].size

        if (memo[row][col] != 0)
            return memo[row][col]

        var len = 1

        for (dir in dirs) {
            val x = dir[0] + row
            val y = dir[1] + col

            if (x < 0 || x == m || y < 0 || y == n || matrix[row][col] >= matrix[x][y])
                continue

            len = Math.max(len, 1+dfs(matrix, x, y, dirs, memo))
        }

        memo[row][col] = len
        return len
    }
}