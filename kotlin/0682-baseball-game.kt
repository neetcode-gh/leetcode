/*
* Using a stack. Time Complexity O(N) and Space Complexity O(N)
*/
class Solution {
    fun calPoints(operations: Array<String>): Int {

        val stack = ArrayDeque<Int>()

        for(op in operations) {
            when (op) {
                "+" -> {
                    val top = stack.removeLast()
                    val sum = stack.peekLast() + top
                    stack.addLast(top)
                    stack.addLast(sum)
                }
                "D" -> {
                    val top = stack.peekLast() * 2
                    stack.addLast(top)
                }
                "C" -> {
                    stack.removeLast()
                }
                else -> {
                    stack.addLast(op.toInt())
                }
            }
        }

        return stack.sum()
    }
}
