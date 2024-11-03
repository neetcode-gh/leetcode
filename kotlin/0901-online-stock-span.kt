class StockSpanner() {
    val stack = LinkedList<Pair<Int, Int>>()

    fun next(price: Int): Int {
        var span = 1
        while (stack.isNotEmpty() && stack.peekLast().first <= price) {
            span += stack.removeLast().second
        }
        stack.addLast(price to span)
        return span
    }

}
