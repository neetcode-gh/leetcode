class Solution {
    fun totalNQueens(n: Int): Int {

        val cols = HashSet<Int>()
        val pD = HashSet<Int>()
        val nD = HashSet<Int>()
        var res = 0

        fun fill(row: Int) {    

            if(row == n) {
                res++
                return
            }

            for(col in 0 until n) {
                if(cols.contains(col) || pD.contains(row + col) || nD.contains(row - col)) continue

                cols.add(col)
                pD.add(row + col)
                nD.add(row - col)

                fill(row+1)

                cols.remove(col)
                pD.remove(row + col)
                nD.remove(row - col)
            }
        }

        fill(0)
        return res
    }
}
