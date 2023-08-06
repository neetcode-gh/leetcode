class Solution {
    fun minPathSum(grid: Array<IntArray>): Int {
        val m = grid.lastIndex
        val n = grid[0].lastIndex
        
        for(i in m - 1 downTo 0) {
            grid[i][n] += grid[i + 1][n]
        }

        for(j in n - 1 downTo 0) {
            grid[m][j] += grid[m][j + 1]
        }

        for(i in grid.lastIndex - 1 downTo 0) {
            for(j in grid[0].lastIndex - 1 downTo 0) {
                grid[i][j] += minOf(grid[i + 1][j], grid[i][j + 1])
            }
        }

        return grid[0][0]
    }
}
