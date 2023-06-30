class Solution {
    fun validateStackSequences(pushed: IntArray, popped: IntArray): Boolean {
        var i = 0
        var stack = LinkedList<Int>()

        for (n in pushed) {
            stack.addLast(n)

            while (i < popped.size && popped[i] == stack.peekLast()) {
                stack.removeLast()
                i++
            }
        }

        return stack.isEmpty()
    }
}
