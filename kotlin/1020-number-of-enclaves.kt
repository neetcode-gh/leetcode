class Solution {
    fun numEnclaves(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        val dirs = arrayOf(
            intArrayOf(1, 0),
            intArrayOf(-1, 0),
            intArrayOf(0, 1),
            intArrayOf(0, -1)
        )

        val visited = Array(rows){BooleanArray(cols)}

        fun isValid(r: Int, c: Int) = 
            r in (0 until rows) && 
            c in (0 until cols) && 
            visited[r][c] == false && 
            grid[r][c] == 1

        fun isValidBorder(r: Int, c: Int) = 
            (r == 0 || r == rows - 1 || c == 0 || c == cols - 1) && 
            visited[r][c] == false

        fun dfs(r: Int, c: Int): Int {
            if (!isValid(r, c))
                return 0
            
            visited[r][c] = true

            var res = 1
            for ((dr, dc) in dirs) {
                res += dfs(r + dr, c + dc)
            }

            return res
        }

        var totalLand = 0
        var borderLand = 0
        for (r in 0 until rows) {
            for (c in 0 until cols) {
                totalLand += grid[r][c]
                if (grid[r][c] == 1 && isValidBorder(r, c)) {
                    borderLand += dfs(r, c)
                }
            }
        }

        return totalLand - borderLand
    }

}
