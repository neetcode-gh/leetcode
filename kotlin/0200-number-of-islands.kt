class Solution {
    fun numIslands(grid: Array<CharArray>): Int {
        var count = 0

        for (i in 0..grid.size-1) {
            for (j in 0..grid[0].size-1) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j)
                    count++
                }
            }
        }

        return count
    }

    fun dfs(grid: Array<CharArray>, i: Int, j: Int) {
        if (i < 0 || i >= grid.size || j < 0 || j >= grid[i].size || grid[i][j] == '0')
            return

        grid[i][j] = '0'

        dfs(grid, i+1, j)
        dfs(grid, i-1, j)
        dfs(grid, i, j+1)
        dfs(grid, i, j-1)
    }
}