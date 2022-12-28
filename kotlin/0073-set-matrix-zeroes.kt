class Solution {
    fun setZeroes(matrix: Array<IntArray>): Unit {
        var m = matrix.size
        var n = matrix[0].size
        var isCol = false

        for (i in 0..m-1) {
            if (matrix[i][0] == 0)
                isCol = true

            for (j in 1..n-1) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0
                    matrix[0][j] = 0
                }
            }
        }

        for (i in 1..m-1) {
            for (j in 1..n-1) {
                if (matrix[0][j] == 0 || matrix[i][0] == 0)
                    matrix[i][j] = 0
            }
        }

        if (matrix[0][0] == 0) {
            for (j in 0..n-1)
                matrix[0][j] = 0
        }

        if (isCol) {
            for (i in 0..m-1)
                matrix[i][0] = 0
        }
    }
}