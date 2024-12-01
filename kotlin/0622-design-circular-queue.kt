class MyCircularQueue(val k: Int) {
    
    private data class ListNode<Int>(
        var value: Int, var next: ListNode<Int>? = null, var prev: ListNode<Int>? = null
    )

    private var left = ListNode(-1)
    private var right = ListNode(-1, null, left)
    private var space = k

    init {
        left.next = right
    }

    fun enQueue(element: Int): Boolean {
        if (isFull()) return false

        ListNode(element, right, right.prev).let { newNode ->
            right.prev!!.next = newNode
            right.prev = newNode
            space--
            return true
        }
    }

    fun deQueue(): Boolean {
        if (isEmpty()) return false

        left.next = left.next!!.next
        left.next!!.prev = left
        space++

        return true
    }

    fun Front() = left.next?.value ?: -1
    fun Rear() = right.prev?.value ?: -1

    fun isEmpty() = left.next == right
    fun isFull() = space == 0
}