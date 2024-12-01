class MyQueue() {
    var s1 = LinkedList<Int>()
    var s2 = LinkedList<Int>()

    fun push(x: Int) {
        s1.addLast(x)
    }

    fun pop(): Int {
        if (s2.isEmpty())
            refill()
        return s2.removeLast() ?: -1
    }

    fun peek(): Int {
        if (s2.isEmpty())
            refill()
        return s2.peekLast() ?: -1
    }

    fun empty() = maxOf(s1.size, s2.size) == 0

    private fun refill() {
        while (s1.isNotEmpty())
            s2.addLast(s1.removeLast())
    }

}
