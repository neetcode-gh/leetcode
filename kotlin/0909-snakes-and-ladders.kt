class Solution {
    fun snakesAndLadders(board: Array<IntArray>): Int {
        val len = board.size
        board.reverse()

        fun intToPos(square: Int): Pair<Int, Int> {
            val r = (square - 1) / len
            var c = (square - 1) % len
            if (r % 2 == 1)
                c = len - 1 - c
            return r to c
        }

        val q = LinkedList<Pair<Int, Int>>()
        q.addFirst(1 to 0)
        val visited = HashSet<Int>()
        while (q.isNotEmpty()) {
            val (square, moves) = q.removeLast()

            for (i in 1..6) {
                var next = i + square
                val (r, c) = intToPos(next)
                if (board[r][c] != -1)
                    next = board[r][c]
                if (next == len * len) 
                    return moves + 1
                if (next !in visited) {
                    visited.add(next)
                    q.addFirst(next to moves + 1)
                }

            }
        }

        return -1
    }
}
