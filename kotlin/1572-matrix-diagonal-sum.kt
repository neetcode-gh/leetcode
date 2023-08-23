class Solution {
    fun diagonalSum(mat: Array<IntArray>): Int {
        val n = mat.lastIndex

        var sum = 0
        for (i in 0..n) {
            sum += mat[i][i] + mat[n - i][i]
        }

        if (n % 2 == 0)
            sum -= mat[n/2][n/2]

        return sum
    }
}
