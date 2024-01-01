// DIY logic
class Solution {
    fun largestOddNumber(num: String): String {
        var end = num.lastIndex
        while (end >= 0 && num[end].toInt() % 2 == 0)
            end--
        return num.substring(0, end + 1)
    }
}

// or make use of Kotlin
class Solution {
    fun largestOddNumber(num: String) = num.substring(0, num.indexOfLast { it.toString().toInt() % 2 == 1 } + 1)
}
