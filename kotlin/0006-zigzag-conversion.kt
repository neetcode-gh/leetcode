class Solution {
    fun convert(s: String, numRows: Int): String {
        if (numRows == 1) return s

        val res = StringBuilder()
        for (r in 0 until numRows) {
            val increment = 2 * (numRows - 1)
            for (i in r until s.length step increment) {
                res.append(s[i])
                if (r > 0 && r < numRows - 1 
                    && i + increment - 2 * r < s.length)
                    res.append(s[i + increment - 2 * r])
            }
        }

        return res.toString()
    }
}
