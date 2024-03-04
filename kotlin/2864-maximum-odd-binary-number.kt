// traverse and swap indices
class Solution {
    fun maximumOddBinaryNumber(s: String): String {
        val sArr = s.toCharArray()
        var left = 0

        for (i in 0 until sArr.size) {
            if (sArr[i] == '1') {
                sArr[i] = sArr[left].also { sArr[left] = sArr[i] }
                left++
            }
        }

        sArr[left - 1] = sArr[sArr.lastIndex].also { sArr[sArr.lastIndex] = sArr[left - 1] }
        return sArr.joinToString("")
    }
}

// Count 1's and build at once
class Solution {
    fun maximumOddBinaryNumber(s: String): String {
        var count = 0
        for (c in s) {
            if (c == '1') count++
        }

        return "1".repeat(count - 1) + "0".repeat(s.length - count) + "1"
    }
}

// Rolling string builder
class Solution {
    fun maximumOddBinaryNumber(s: String) = buildString {
        var count = s.count  { it == '1' } - 1
        val n = s.length

        for (i in 0 until n - 1) {
            if (count > 0) {
                append("1")
                count--
            } else {
                append("0")
            }
        }

        append("1")
        return toString()
    }
}
