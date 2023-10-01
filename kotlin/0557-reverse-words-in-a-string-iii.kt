class Solution {
    fun reverseWords(s: String): String {
        val words = s.split(" ")
        val res = LinkedList<String>()

        for (word in words) {
            if (res.isNotEmpty())
                res.add(" ")
            val sb = StringBuilder()
            for (i in word.lastIndex downTo 0) {
                sb.append(word[i])
            }
            res.add(sb.toString())
        }

        return res.joinToString("")
    }
}

//Kotlin idomatic
fun reverseWords(s: String) = s.split(" ").map { it.reversed() }.joinToString(" ")
