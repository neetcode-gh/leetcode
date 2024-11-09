class Solution {
    fun maxLengthBetweenEqualCharacters(s: String): Int {
        val charIndex = HashMap<Char, Int>()
        var res = -1

         for ((i, c) in s.withIndex()) {
            if (c in charIndex)
                res = maxOf(res, i - charIndex[c]!! - 1)
            else
                charIndex[c] = i
        }

        return res
    }
}

// Similar but slightly different way
class Solution {
    fun maxLengthBetweenEqualCharacters(s: String): Int {
        val letters = Array (26) { intArrayOf(302, -302) }
        var res = -1
        for (l in letters.indices) {
            for ((i, c) in s.withIndex()) {
                if (c == ('a' + l)) {
                    letters[l][0] = minOf(letters[l][0], i)
                    letters[l][1] = maxOf(letters[l][1], i)
                    res = maxOf(res, letters[l][1] - letters[l][0] - 1)
                }
            }
        }

        return res
    }
}
