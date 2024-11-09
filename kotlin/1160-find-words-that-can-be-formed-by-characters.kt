class Solution {
    fun countCharacters(words: Array<String>, chars: String): Int {
        val charMap = chars.groupingBy { it }.eachCount()
        var res = 0
        outer@for (word in words) {
            val wordMap = word.groupingBy { it }.eachCount()
            for ((ch, cnt) in wordMap) {
                if (charMap[ch] == null || charMap[ch]!! < cnt)
                    continue@outer
            }
            res += word.length
        }
        return res
    }
}

// modularize funtion for readability
class Solution {
    fun countCharacters(words: Array<String>, chars: String): Int {
        val charMap = chars.getMap()
        var res = 0
        for (word in words) {
            val wordMap = word.getMap()
            if (wordMap.canMake(charMap))
                res += word.length
        }
        return res
    }

    fun IntArray.canMake(another: IntArray): Boolean {
        for (i in 0 until 26) {
            if (this[i] > another[i])
                return false
        }
        return true
    }

    fun String.getMap(): IntArray {
        val res = IntArray (26)
        for (c in this)
            res[c - 'a']++
        return res
    }
}

// Short Kotlin solution
class Solution {
    fun countCharacters(words: Array<String>, chars: String) = words
        .filter { word ->
            word.none { c ->
                word.count { it == c } > chars.count { it == c }
            }
        }
        .sumOf { it.length }
}
