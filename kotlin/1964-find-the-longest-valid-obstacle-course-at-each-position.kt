class Solution {
    fun longestObstacleCourseAtEachPosition(obstacles: IntArray): IntArray {
        val dp = IntArray(obstacles.size) { Integer.MAX_VALUE }
        val res = IntArray(obstacles.size)

        fun binarySearch(n: Int): Int {
            var l = 0
            var r = dp.lastIndex

            while (l < r) {
                val m = l + (r - l) / 2
                if (n >= dp[m]) l = m + 1
                else r = m
            }

            return l
        }

        for ((i, n) in obstacles.withIndex()) {
            val insert = binarySearch(n)
            res[i] = insert + 1
            dp[insert] = n
        }

        return res
    }
}
