package kotlin

class Solution {
    fun solveNQueens(n: Int): List<List<String>> {
        if (n == 1) return listOf(listOf("Q"))
        val resultantList = mutableListOf<List<String>>()
        val board = MutableList(n) {
            StringBuilder(".".repeat(n))
        }
        val unavailableColumnPositions = hashSetOf<Int>()
        val unavailableLeftDiagonalPositions = hashSetOf<Int>()
        val unavailableRightDiagonalPositions = hashSetOf<Int>()

        // Queens indexed from 0. ie : Q_0,Q_1,Q_2....Q_n
        @Suppress("UnnecessaryVariable")
        fun dfs(nthQueen: Int = 0): Boolean {
            if (nthQueen == n) {
                val list = mutableListOf<String>()
                board.forEach { list.add(it.toString()) }
                resultantList.add(list)
                return false
            }
            // nthQueen needs to be inserted in the nth row. Therefore,
            // the parameter "nthQueen" can also be considered as the row
            // index.
            val row = nthQueen
            for (column in 0 until n) {
                if (
                    unavailableColumnPositions.contains(column) ||
                    unavailableLeftDiagonalPositions.contains(row - column) ||
                    unavailableRightDiagonalPositions.contains(row + column)
                ) continue

                // place queen
                board[row][column] = 'Q'
                unavailableColumnPositions.add(column)
                unavailableLeftDiagonalPositions.add(row - column)
                unavailableRightDiagonalPositions.add(row + column)

                // try placing the next queen
                val isQueenPlaced = dfs(nthQueen + 1)
                if (isQueenPlaced) return true

                // remove queen
                board[row][column] = '.'
                unavailableColumnPositions.remove(column)
                unavailableLeftDiagonalPositions.remove(nthQueen - column)
                unavailableRightDiagonalPositions.remove(nthQueen + column)
            }
            return false
        }
        dfs()
        return resultantList
    }
}