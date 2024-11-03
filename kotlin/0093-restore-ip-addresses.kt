class Solution {
    fun restoreIpAddresses(s: String): List<String> {
        val res = mutableListOf<String>()

        fun backTrack(i: Int, dots: Int, cur: String) {
            if (dots == 4 && i == s.length) {
                res.add(cur.substring(0, cur.lastIndex))
                return
            }
            if (dots > 4) return

            for (j in i until minOf(i + 3, s.length)) {
                val digits = s.substring(i, j + 1)
                if (digits.toInt() <= 255 && (i == j || s[i] != '0'))
                    backTrack(j + 1, dots + 1, cur + digits + ".")
            }
        }

        backTrack(0, 0, "")
        return res
    }
}
