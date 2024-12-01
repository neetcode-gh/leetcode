class Solution {
    fun champagneTower(poured: Int, query_row: Int, query_glass: Int): Double {
        var prevRow = doubleArrayOf(poured.toDouble())

        for (row in 1..query_row) {
            var nextRow = DoubleArray (row + 1)
            for (i in 0 until row) {
                var leftOver = prevRow[i] - 1.0
                if (leftOver > 0) {
                    nextRow[i] += leftOver * 0.5
                    nextRow[i + 1] += leftOver * 0.5
                }
            }
            prevRow = nextRow
        }

        return minOf(1.0, prevRow[query_glass])
    }
}
