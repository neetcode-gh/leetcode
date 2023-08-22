class Solution {
    fun removeStars(s: String): String {
        val stack = LinkedList<Char>()

        for (c in s) {
            if (c == '*' && stack.isNotEmpty()) {
                stack.removeLast()
            } else {
                stack.addLast(c)
            }
        }

        return stack.joinToString("")
    }
}
