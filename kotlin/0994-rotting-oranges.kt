class Solution {
    fun orangesRotting(grid: Array<IntArray>): Int {
        val m = grid.size
        val n = grid[0].size
        var fresh = 0
        var minute = -1
        var queue = LinkedList<IntArray>()
        val dirs = arrayOf(intArrayOf(-1,0),intArrayOf(1,0),intArrayOf(0,1),intArrayOf(0,-1))

        for (i in 0..m-1) {
            for (j in 0..n-1) {
                val curr = grid[i][j]

                if (curr == 2)
                    queue.add(intArrayOf(i, j))
                else if (curr == 1)
                    fresh++
            }
        }

        var temp = LinkedList<IntArray>()

        while (queue.size != 0) {
            val curr = queue.poll()

            for (dir in dirs) {
                val x = curr[0] + dir[0]
                val y = curr[1] + dir[1]

                if (x < 0 || x >= m || y < 0 || y >= n)
                    continue

                if (grid[x][y] == 1) {
                    temp.add(intArrayOf(x, y))
                    fresh--
                    grid[x][y] = 2
                }
            }

            if (queue.size == 0) {
                minute++
                queue = temp
                temp = LinkedList<IntArray>()
            }
        }

        if (fresh != 0)
            return -1

        return if (minute == -1) 0 else minute
    }
}