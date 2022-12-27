package kotlin

class Solution {
    fun letterCombinations(digits: String): List<String> {
        if (digits.isEmpty()) return emptyList()
        val resultantList = mutableListOf<String>()
        val stringBuilder = StringBuilder()
        val digitCharListMapping = mutableMapOf(
            '2' to listOf('a', 'b', 'c'),
            '3' to listOf('d', 'e', 'f'),
            '4' to listOf('g', 'h', 'i'),
            '5' to listOf('j', 'k', 'l'),
            '6' to listOf('m', 'n', 'o'),
            '7' to listOf('p', 'q', 'r', 's'),
            '8' to listOf('t', 'u', 'v'),
            '9' to listOf('w', 'x', 'y', 'z')
        )

        fun dfs(decisionIndex: Int = 0) {
            if (stringBuilder.length == digits.length) {
                resultantList.add(stringBuilder.toString())
                return
            }
            val charListForDigitAtDecisionIndex = digitCharListMapping.getValue(digits[decisionIndex])
            for (char in charListForDigitAtDecisionIndex) {
                stringBuilder.append(char)
                dfs(decisionIndex + 1)
                stringBuilder.deleteCharAt(stringBuilder.lastIndex)
            }
        }
        dfs()
        return resultantList
    }
}