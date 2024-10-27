class Solution {
    fun minFallingPathSum(m: Array<IntArray>): Int {
        val n = m.size
        for (i in 1 until n) {
            for (j in 0 until n) {
                m[i][j] += minOf(
                    if (j > 0) m[i - 1][j - 1] else 10001,
                    m[i - 1][j],
                    if (j + 1 < n) m[i - 1][j + 1] else 10001,
                )
            }
        }

        return m[n - 1].min()!!
    }
}
