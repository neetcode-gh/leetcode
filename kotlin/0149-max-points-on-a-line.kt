class Solution { 
    fun maxPoints(points: Array<IntArray>): Int {
        val n = points.size

        var res = 1
        for (i in 0 until n) {
            val p1 = points[i]
            val count = HashMap<Double, Int>()

            for (j in i + 1 until n) {
                val p2 = points[j]
                
                val slope = when {
                    p1[1] == p2[1] -> 0.0
                    p1[0] != p2[0] -> (p1[1] - p2[1]) * 1.0 / (p1[0] - p2[0])
                    else -> Double.MAX_VALUE
                }

                count[slope] = count.getOrDefault(slope, 0) + 1
                res = maxOf(res, (count[slope] ?: 0) + 1)
            }
        }

        return res
    }
}
