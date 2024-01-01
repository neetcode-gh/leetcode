// same as below, but using xor
class Solution {
    fun findTheDifference(s: String, t: String): Char {
        var res = 0
        for (c in s) res = res xor c.toInt()
        for (c in t) res = res xor c.toInt()
        return res.toChar()
    }
}

// using sums difference
class Solution {
    fun findTheDifference(s: String, t: String): Char {
        var sum = 0
        for (c in t) sum += c.toInt()
        for (c in s) sum -= c.toInt()
        return sum.toChar()
    }
}
