class Solution {
    fun shiftGrid(grid: Array<IntArray>, k: Int): List<List<Int>> {
        val m = grid.size
        val n = grid[0].size

        fun posToVal(r: Int, c: Int) = r * n + c

        fun valToPos(v: Int) = (v / n) to (v % n)

        val res = MutableList<MutableList<Int>> (m) { MutableList<Int> (n) { 0 } }
        for (r in 0 until m) {
            for (c in 0 until n) {
                val newVal = (posToVal(r, c) + k) % (m * n)
                val (newR, newC) = valToPos(newVal)
                res[newR][newC] = grid[r][c]
            }
        }

        return res
    }
}
