class Solution {
    fun mergeAlternately(word1: String, word2: String): String {
        val m = word1.length
        val n = word2.length
        var i = 0
        var j = 0

        val res = StringBuilder()
        while (i < m && j < n) {
            res.append(word1[i++])
            res.append(word2[j++])
        }

        res.append(word1.drop(i))
        res.append(word2.drop(j))

        return res.toString()
    }
}
