class Solution {
    fun shortestPathBinaryMatrix(grid: Array<IntArray>): Int {

        if(grid[0][0] == 1 || grid[grid.lastIndex][grid.lastIndex] == 1) return -1

        fun isValid(i: Int, j: Int) = i in (0..grid.lastIndex) && j in (0..grid.lastIndex) && grid[i][j] == 0

        val q = ArrayDeque<Pair<Int, Int>>()
        var distance = 0

        q.add(0 to 0)
        grid[0][0] = 1

        while (q.isNotEmpty()) {
            distance++
            val size = q.size
            repeat (size) {
                val (i, j) = q.poll()
                if(i == grid.lastIndex && j == grid.lastIndex) return distance
                for(cell in cells) {
                    val nextI = i + cell[0]
                    val nextJ = j + cell[1]
                    if(isValid(nextI, nextJ)) {
                        q.add(nextI to nextJ)
                        grid[nextI][nextJ] = 1
                    }
                }
            }    
        }

        return -1
    }

    companion object {
        val cells = arrayOf(
            intArrayOf(0,1),
            intArrayOf(1,1),
            intArrayOf(0,-1),
            intArrayOf(1,-1),
            intArrayOf(1,0),
            intArrayOf(-1,-1),
            intArrayOf(-1,0),
            intArrayOf(-1, 1)
        )    
    }
}
