class Solution {
    fun asteroidCollision(ast: IntArray): IntArray {
        val stack = LinkedList<Int>()

        for (_a in ast) {
            var a = _a
            while (stack.isNotEmpty() && a < 0 && stack.peekLast() > 0) {
                val diff = a + stack.peekLast()
                if (diff < 0) {
                    stack.removeLast()
                } else if (diff > 0) {
                    a = 0
                } else {
                    a = 0
                    stack.removeLast()
                }
            }

            if (a != 0) stack.addLast(a)
        }

        return stack.toIntArray()
    }
}
