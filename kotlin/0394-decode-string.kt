class Solution {
    fun decodeString(s: String): String {
        val stack = LinkedList<String>()

        for (c in s) {
            if (c != ']') {
                stack.addLast(c.toString())
            } else {
                val sb = StringBuilder()
                while (stack.isNotEmpty() && stack.peekLast() != "[")
                    sb.insert(0, stack.removeLast())
                stack.removeLast()

                val k = StringBuilder()
                while (stack.isNotEmpty() && stack.peekLast().all { char -> char.isDigit() })
                    k.insert(0, stack.removeLast())

                val times = k.toString().toInt()
                stack.addLast(sb.toString().repeat(times))
            }
        }

        return stack.joinToString("")
    }
}
