class Solution {
    fun closedIsland(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size

        val visited = Array(rows){BooleanArray(cols)}

        fun isValid(r: Int, c: Int) = r in (0 until rows) && c in (0 until cols)

        fun dfs(r: Int, c: Int): Int {
            if(!isValid(r, c))
                return 0
            if(grid[r][c] == 1 || visited[r][c] == true)
                return 1
            
            visited[r][c] = true
            return minOf(
                minOf(
                    dfs(r + 1, c),
                    dfs(r - 1, c)
                ),
                minOf(
                    dfs(r, c + 1),
                    dfs(r, c - 1)
                )
            )
        }

        var islands = 0
        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (grid[r][c] == 0 && visited[r][c] == false) {
                    if (dfs(r, c) != 0)
                        islands++
                }
            }
        }

        return islands
    }
}
