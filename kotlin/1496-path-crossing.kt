class Solution {
    fun isPathCrossing(path: String): Boolean {
        var dirs = mapOf(
            'N' to intArrayOf(0, 1),
            'S' to intArrayOf(0, -1),
            'E' to intArrayOf(1, 0),
            'W' to intArrayOf(-1, 0),
        )
        val visit = HashSet<Pair<Int, Int>>()
        var x = 0
        var y = 0

        for (c in path) {
            visit.add(x to y)
            val (dx, dy) = dirs[c]!!
            x += dx
            y += dy
            if ((x to y) in visit)
                return true
        }

        return false
    }
}
