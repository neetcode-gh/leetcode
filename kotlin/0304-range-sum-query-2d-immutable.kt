class NumMatrix(matrix: Array<IntArray>) {

    val row = matrix.size
    val col = matrix[0].size
    val prefixSum = Array(row + 1){ IntArray(col + 1) }

    init {
        for(i in 0 until row) {
            var prefix = 0
            for(j in 0 until col) {
                println("i: $i j: $j")
                prefix += matrix[i][j]
                prefixSum[i + 1][j + 1] = prefix + prefixSum[i][j + 1]
            }
        }
    }
    

    fun sumRegion(row1: Int, col1: Int, row2: Int, col2: Int): Int {
        val r1 = row1 + 1
        val r2 = row2 + 1
        val c1 = col1 + 1
        val c2 = col2 + 1

        val botRight = prefixSum[r2][c2]
        val aboveOf = prefixSum[r1 - 1][c2]
        val leftOf = prefixSum[r2][c1 - 1]
        val topLeft = prefixSum[r1 - 1][c1 - 1]

        return botRight - aboveOf - leftOf + topLeft
    }

}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
