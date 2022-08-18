package kotlin

// Runtime: 356 ms, faster than 72.97% of Kotlin online submissions for Surrounded Regions.
// Memory Usage: 48.5 MB, less than 75.68% of Kotlin online submissions for Surrounded Regions.
// https://leetcode.com/submissions/detail/776042031/
class Solution {
    fun solve(board: Array<CharArray>): Unit {
        val n = board.size
        val m = board[0].size

        for (y in 0 until n) {
            for (x in 0 until m) {
                if (x==0||x==m-1||y==0||y==n-1){
                    if (board[y][x] == 'O') {
                        markI(board, y, x)
                    }
                }
            }
        }

        for (y in 0 until n) {
            for (x in 0 until m) {
                board[y][x] = when(board[y][x]){
                    'O' -> 'X'
                    'I' -> 'O'
                    else -> board[y][x] // could've just 'continue'd only if leetcode uses newer version of Kotlin
                }
            }
        }
    }
    fun inBound(board: Array<CharArray>, r: Int, c: Int) : Boolean {
        val n = board.size
        val m = board[0].size
        return !(r < 0 || r >= n || c < 0 || c >= m)
    }
    fun markI(board: Array<CharArray>, y: Int, x: Int) {
        if (!inBound(board, y, x)) return
        if (board[y][x] != 'O') return
        board[y][x] = 'I'
        markI(board, y+1, x)
        markI(board, y-1, x)
        markI(board, y, x+1)
        markI(board, y, x-1)
    }
}
