class Solution {
    fun minimumTotal(triangle: List<List<Int>>): Int {
        val dp = IntArray(triangle.last().size + 1)

        for (row in triangle.reversed()) {
            for ((i,n) in row.withIndex())
                dp[i] = minOf(dp[i], dp[i + 1]) + n
        }

        return dp[0]
    }
}
