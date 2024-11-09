class Solution {
    // Time : O(n) | Space : O(n)
    fun numDecodings(string: String): Int {
        if (string.length == 1) return if (string.last() != '0') 1 else 0
        // dp array
        val numberOfDecodings = IntArray(string.length + 1).apply {
            this[lastIndex - 1] = if (string.last() == '0') 0 else 1
            this[lastIndex] = if ("${string[string.lastIndex - 1]}${string[string.lastIndex]}".toInt() <= 26) 1 else 0
        }
        for (i in (string.lastIndex - 1) downTo 0) {
            if (string[i] == '0') {
                numberOfDecodings[i] = 0
                continue
            }
            numberOfDecodings[i] += numberOfDecodings[i + 1]
            numberOfDecodings[i] += numberOfDecodings[i + 2].takeIf {
                (string[i] == '1' && string[i + 1] in '0'..'9') || (string[i] == '2' && string[i + 1] in '0'..'6')
            } ?: 0
        }
        return numberOfDecodings[0]
    }
}