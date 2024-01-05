class Solution {
    fun makeEqual(words: Array<String>): Boolean {
        val n = words.size
        val count = IntArray (26)

        for (word in words) {
            for (c in word)
                count[c - 'a']++
        }

        for (cnt in count) {
            if (cnt % n != 0)
                return false
        }

        return true
    }
}

// or do it kotlin way!
class Solution {
    fun makeEqual(words: Array<String>) = words
    .joinToString("")
    .groupingBy { it }
    .eachCount()
    .all { it.value % words.size == 0 }
}
