// recursive solution
class Solution {
    fun checkMove(board: Array<CharArray>, rMove: Int, cMove: Int, color: Char): Boolean {
        board[rMove][cMove] = color

        val rowColumDirections = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(-1, 0),
            intArrayOf(1, 1),
            intArrayOf(-1, -1),
            intArrayOf(1, -1),
            intArrayOf(-1, 1)
        )

        fun isValidCell(row: Int, column: Int) = row in board.indices &&
                column in board[row].indices &&
                board[row][column] != EMPTY_CELL &&
                board[row][column] != VISITED_CELL

        fun dfs(
            startRow: Int,
            startColumn: Int,
            rowDir: Int,
            columnDir: Int,
            cellsInCurrentPath: Int
        ): Boolean {
            if (board[startRow][startColumn] == color) {
                board[startRow][startColumn] = VISITED_CELL
                return cellsInCurrentPath >= 2 // there must be 2 other nodes, not including the current node
            }
            board[startRow][startColumn] = VISITED_CELL
            val newRow = startRow + rowDir
            val newColumn = startColumn + columnDir
            if (!isValidCell(newRow, newColumn)) return false
            return dfs(newRow, newColumn, rowDir, columnDir, cellsInCurrentPath + 1)
        }

        for ((rowDir, colDir) in rowColumDirections) {
            val newRow = rMove + rowDir
            val newColumn = cMove + colDir
            if (!isValidCell(newRow, newColumn)) continue
            if (dfs(newRow, newColumn, rowDir, colDir, 1)) return true
        }
        return false
    }

    companion object {
        private const val VISITED_CELL = '|'
        private const val EMPTY_CELL = '.'
    }
}

// Iterative Solution
class Solution {

    fun checkMove(board: Array<CharArray>, rMove: Int, cMove: Int, color: Char): Boolean {
        val rowColumDirections = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(-1, 0),
            intArrayOf(1, 1),
            intArrayOf(-1, -1),
            intArrayOf(1, -1),
            intArrayOf(-1, 1)
        )

        fun isValidCell(row: Int, column: Int) = row in board.indices &&
                column in board[row].indices &&
                board[row][column] != EMPTY_CELL

        fun checkIfValidInDirection(rowDir: Int, colDir: Int): Boolean {
            var currentRow = rMove + rowDir
            var currentColumn = cMove + colDir
            var numberOfCellsInPath = 1
            while (isValidCell(currentRow, currentColumn) && board[currentRow][currentColumn] != color) {
                numberOfCellsInPath++
                currentRow += rowDir
                currentColumn += colDir
            }
            return isValidCell(currentRow, currentColumn) && numberOfCellsInPath >= 2
        }

        for ((rowDir, colDir) in rowColumDirections) {
            if (checkIfValidInDirection(rowDir, colDir)) return true
        }
        return false
    }

    companion object {
        private const val EMPTY_CELL = '.'
    }
}