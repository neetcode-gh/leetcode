class MyStack() {

    val stack = LinkedList<Int>()

    fun push(x: Int) = stack.addLast(x)

    // Circular behaviour
    fun pop(): Int {
        repeat(stack.size-1) {
            stack.addLast(stack.removeFirst())
        }
        return stack.removeFirst()
    }

    fun top() = stack.peekLast()

    fun empty() = stack.isEmpty()

}

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
