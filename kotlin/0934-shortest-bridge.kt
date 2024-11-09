class Solution {

    fun shortestBridge(grid: Array<IntArray>): Int {
        // q = [ (row,column,level) ]
        val queue: Queue<Triple<Int, Int, Int>> = LinkedList()
        val rowColumnDirections = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(-1, 0)
        )

        fun dfs(startRow: Int, startColumn: Int) {
            if (
                startRow !in grid.indices ||
                startColumn !in grid[startRow].indices ||
                grid[startRow][startColumn] == 0 ||
                grid[startRow][startColumn] == VISITED_CELL
            ) return
            grid[startRow][startColumn] = VISITED_CELL
            queue.add(Triple(startRow, startColumn, 0))
            for ((rowDir, columDir) in rowColumnDirections) {
                dfs(startRow + rowDir, startColumn + columDir)
            }
        }
        // find one island and mark the cells with -1
        outer@ for (row in grid.indices) {
            inner@ for (column in grid[row].indices) {
                if (grid[row][column] != 1) continue
                dfs(row, column)
                break@outer
            }
        }
        while (queue.isNotEmpty()) {
            val (row, column, level) = queue.remove()
            for ((rowDir, colDir) in rowColumnDirections) {
                if (row + rowDir !in grid.indices) continue
                if (column + colDir !in grid[row + rowDir].indices) continue
                if (grid[row + rowDir][column + colDir] == VISITED_CELL) continue
                if (grid[row + rowDir][column + colDir] == 1) return level
                queue.add(Triple(row + rowDir, column + colDir, level + 1))
                grid[row + rowDir][column + colDir] = VISITED_CELL
            }
        }
        throw IllegalStateException("Two islands where expected to be in the grid.")
    }

    companion object {
        private const val VISITED_CELL = -1
    }
}

