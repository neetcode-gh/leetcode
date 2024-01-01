// count the number of "AAA" and "BBB"
class Solution {
    fun winnerOfGame(s: String): Boolean {
        var alice = 0
        var bob = 0

        for (i in 1 until s.lastIndex) {
            if (s[i - 1] == s[i] && s[i] == s[i + 1]) {
                if (s[i] == 'A')
                    alice++
                if (s[i] == 'B')
                    bob++
            }
        }

        return alice > bob
    }
}

// or alternativly count the picks directly
class Solution {
    fun winnerOfGame(s: String): Boolean {
        var colorA = 0
        var i = 0
        while (i < s.length) {
            var j = i
            while (j < s.length && s[j] == 'A') j++
            if (j - i > 2) colorA += (j - i - 2)
            i = ++j
        }

        var colorB = 0
        i = 0
        while (i < s.length) {
            var j = i
            while (j < s.length && s[j] == 'B') j++
            if (j - i > 2) colorB += (j - i - 2)
            i = ++j
        }

        return if (colorA - colorB > 0) true else false
    }
}
