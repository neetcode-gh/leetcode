class Solution {
    fun largestSubmatrix(matrix: Array<IntArray>): Int {
        val n = matrix.size
        val m = matrix[0].size    
        var prevHeights = IntArray (m)
        var res = 0

        for (i in 0 until n) {
            val curHeights = matrix[i].copyOf()
            for (j in 0 until m) {
                if (curHeights[j] > 0)
                    curHeights[j] += prevHeights[j]
            }

            val sortedHeights = curHeights.sortedDescending()
            for (k in 0 until m)
                res = maxOf(res, (k + 1) * sortedHeights[k])

            prevHeights = curHeights
        }

        return res
    }
}
