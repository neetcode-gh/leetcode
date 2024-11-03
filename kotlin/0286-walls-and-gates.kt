class Solution {
    fun wallsAndGates(rooms: Array<IntArray>): Unit {
        val queue: Queue<Pair<Int, Int>> = LinkedList()
        for (i in 0 until rooms.size) {
            for (j in 0 until rooms[0].size) {
                if (rooms[i][j] == 0) {
                    queue.offer(Pair(i, j))
                }
            }
        }

        val directions = arrayOf(arrayOf(-1, 0), arrayOf(1, 0), arrayOf(0, -1), arrayOf(0, 1))
        var distance = 1
        while (queue.isNotEmpty()) {
            val size = queue.size
            repeat(size) {
                val cell = queue.poll()
                for (direction in directions) {
                    val newRow = cell.first+direction[0]
                    val newCol = cell.second+direction[1]
                    if (newRow >= 0 && newRow < rooms.size && newCol >= 0 && newCol < rooms[0].size && rooms[newRow][newCol] == Integer.MAX_VALUE) {
                        rooms[newRow][newCol] = distance
                        queue.offer(Pair(newRow, newCol))
                    }
                }
            }
            distance++
        }
    }
}