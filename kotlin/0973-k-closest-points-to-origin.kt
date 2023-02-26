class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        val minHeap = PriorityQueue<IntArray> { a, b -> a[0] - b[0] }
        val result = Array<IntArray>(k) { IntArray(2) { 0 } }
        
        for (point in points) {
            minHeap.add(
                intArrayOf(
                    /* distance from (0,0) */ point[0].squared() + point[1].squared(),
                    /* x coordinate */ point[0],
                    /* y coordinate */ point[1]
                )
            )
        }

        for (i in 0 until k) {
            val pointWithDistance = minHeap.poll()
            result[i][0] = pointWithDistance[1]
            result[i][1] = pointWithDistance[2]
        }

        return result
    }

    private fun Int.squared() = this * this
}