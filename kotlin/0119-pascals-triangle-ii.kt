class Solution {
    fun getRow(rowIndex: Int): List<Int> {
        var res = mutableListOf(1)

        for (i in 0 until rowIndex) {
            val nextRow = MutableList<Int> (res.size + 1) { 0 }
            for (j in 0 until res.size) {
                nextRow[j] += res[j]
                nextRow[j + 1] += res[j]
            }
            res = nextRow
        }

        return res
    }
}
