class Solution {
    fun numSubmatrixSumTarget(matrix: Array<IntArray>, target: Int): Int {
        val n = matrix.size
        val m = matrix[0].size
        val prefix = Array (n) { IntArray (m) }

        for (i in 0 until n) {
            for (j in 0 until m) {
                val top = if (i > 0) prefix[i - 1][j] else 0
                val left = if (j > 0) prefix[i][j - 1] else 0
                val topLeft = if (minOf(i, j) > 0) prefix[i - 1][j - 1] else 0
                prefix[i][j] = matrix[i][j] + top + left - topLeft
            }
        }

        var res = 0
        for (i in 0 until n) {
            for (i2 in i until n) {
                var count = HashMap<Int, Int>()
                count[0] = 1
                for (j in 0 until m) {
                    val curSum = prefix[i2][j] - (if (i > 0) prefix[i - 1][j] else 0)
                    val diff = curSum - target
                    res += (count[diff] ?: 0)
                    count[curSum] = (count[curSum] ?: 0) + 1
                }
            }
        }

        return res
    }
}
