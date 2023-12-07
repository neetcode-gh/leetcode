class Solution {
    fun largestGoodInteger(num: String): String {
        var res = ""
        for (i in 2..num.lastIndex) {
            val cur = num.substring(i - 2, i + 1)
            if (cur[0] == cur[1] && cur[0] == cur[2])
                res = maxOf(res, cur)
        }
        return res
    }
}

// ...or use power of Kotlin
class Solution {
    fun largestGoodInteger(num: String) = num
            .windowed(3)
            .filter { it.toSet().size == 1 }
            .maxOrNull() ?: ""

}
