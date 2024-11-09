class Solution {
    fun removeDuplicates(s: String, k: Int): String {
        val stack = LinkedList<Pair<Char, Int>>()

        for (c in s) {
            if (stack.isNotEmpty() && stack.peekLast().first == c) {
                val (ch, co) = stack.removeLast()
                stack.addLast(c to (co + 1))
            } else {
                stack.addLast(c to 1)
            }

            if (stack.isNotEmpty() && stack.peekLast().second == k) {
                stack.removeLast()
            }
        }

        val res = StringBuilder()
        for ((ch, co) in stack) {
            repeat (co) {
                res.append(ch)
            }
        }

        return res.toString()
    }
}
