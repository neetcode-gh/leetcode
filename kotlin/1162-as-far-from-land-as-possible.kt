// BFS solution
class Solution {
    fun maxDistance(grid: Array<IntArray>): Int {

        fun isValid(i: Int, j: Int) = i in (0..grid.lastIndex) && j in (0..grid[0].lastIndex) && grid[i][j] == 0

        val q = ArrayDeque<Pair<Int, Int>>()
        var distance = -1

        for (i in grid.indices) {
            for (j in grid[0].indices) {
                if (grid[i][j] == 1) 
                    q.add(i to j)
            }
        }

        while (q.isNotEmpty()) {

            distance++

            val size = q.size
            repeat (size) {

                val (i,j) = q.poll()

                for (dir in dirs) {
                    val nextI = i + dir[0]
                    val nextJ = j + dir[1]
                    if (isValid(nextI, nextJ)) {
                        q.add(nextI to nextJ)
                        grid[nextI][nextJ] = 1
                    }
                }
            }
        }

        return if (distance > 0) distance else -1
    }

    val dirs = arrayOf(
        intArrayOf(0, 1),
        intArrayOf(0, -1),
        intArrayOf(1, 0),
        intArrayOf(-1, 0)
    )
}

//DP solution
class Solution {
    fun maxDistance(grid: Array<IntArray>): Int {

        val defaultValue = 100 + 100 + 1
        
        for (i in grid.indices) {
            for (j in grid[0].indices) {
                if (grid[i][j] == 1) continue
                grid[i][j] = defaultValue
                if(i > 0) grid[i][j] = minOf(grid[i][j], grid[i - 1][j] + 1)
                if(j > 0) grid[i][j] = minOf(grid[i][j], grid[i][j - 1] + 1)
            }
        }

        var res = 0
        for (i in grid.lastIndex downTo 0) {
            for (j in grid[0].lastIndex downTo 0) {
                if (grid[i][j] == 1) continue
                if(i < grid.lastIndex) grid[i][j] = minOf(grid[i][j], grid[i + 1][j] + 1)
                if(j < grid[0].lastIndex) grid[i][j] = minOf(grid[i][j], grid[i][j + 1] + 1)
                res = maxOf(res, grid[i][j])
            }
        }

        return if (res == defaultValue) -1 else res - 1
    }      
}
