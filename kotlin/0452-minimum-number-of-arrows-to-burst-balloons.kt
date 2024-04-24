class Solution {
    fun findMinArrowShots(points: Array<IntArray>): Int {
        points.sortWith(compareBy({ it[0] }, { it[1] }))

        var res = points.size
        var prev = points[0]
        for (i in 1 until points.size) {
            val curr = points[i]
            if (curr[0] <= prev[1]) {
                res--
                prev[0] = curr[0]
                prev[1] = minOf(curr[1], prev[1])
            } else {
                prev = curr
            }
        }

        return res
    }
}
