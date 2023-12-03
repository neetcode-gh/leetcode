class Solution {
    fun arrayStringsAreEqual(word1: Array<String>, word2: Array<String>): Boolean {
        var w1 = 0
        var w2 = 0
        var i = 0
        var j = 0

        while (w1 < word1.size && w2 < word2.size) {
            if (word1[w1][i] != word2[w2][j])
                return false

            i++
            j++
            if (i == word1[w1].length) {
                w1++
                i = 0
            }
            if (j == word2[w2].length) {
                w2++
                j = 0
            }
        }

        if (w1 != word1.size || w2 != word2.size)
            return false

        return true
    }
}

// short kotlin one liner
class Solution {
    fun arrayStringsAreEqual(w1: Array<String>, w2: Array<String>) = w1.joinToString("") == w2.joinToString("")
}
