class Solution {
    fun maxWidthOfVerticalArea(points: Array<IntArray>): Int {
        points.sortBy { it[0] }
        var res = -1
        for (i in 1 until points.size)
            res = maxOf(res, points[i][0] - points[i - 1][0])
        return res
    }
}
