class MinStack() {
    private val stack = Stack<Int>()
    private val minStack = Stack<Int>()

    fun push(`val`: Int) {
        val currentMin = if (minStack.isNotEmpty()) minStack.peek() else Integer.MAX_VALUE
        val newMin = minOf(currentMin, `val`)
        stack.push(`val`)
        minStack.push(newMin)
    }

    fun pop() {
        if (stack.isNotEmpty()) {
            stack.pop()
            minStack.pop()
        }
    }

    fun top(): Int {
        return stack.peek()
    }

    fun getMin(): Int {
        return minStack.peek()
    }
}