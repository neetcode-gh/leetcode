class Solution {
    fun maxAreaOfIsland(grid: Array<IntArray>): Int {
        var res = 0

        for (i in 0..grid.size-1) {
            for (j in 0..grid[0].size-1) {
                if (grid[i][j] == 1) {
                    val curr = dfs(grid, i, j)
                    res = Math.max(res, curr)
                }
            }
        }

        return res
    }

    fun dfs(grid: Array<IntArray>, row: Int, col: Int): Int {
        if (row < 0 || row >= grid.size || col < 0 || col >= grid[0].size)
            return 0

        if (grid[row][col] == 0)
            return 0

        grid[row][col] = 0

        return dfs(grid, row+1, col) + dfs(grid, row-1, col) + dfs(grid, row, col+1) + dfs(grid, row, col-1)+1
    }
}