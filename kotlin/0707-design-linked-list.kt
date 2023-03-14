class MyLinkedList() {

    class ListNode(var `val`: Int) {
        var next: ListNode? = null
        var prev: ListNode? = null
    }

    val head = ListNode(0)
    val tail = ListNode(0)
    
    init {
        head.next = tail
        tail.prev = head
    }

    fun get(index: Int): Int {
        var current = head.next
        var i = 0
        while( current != null && i != index) {
            current = current.next
            i++
        }
        return if(current != null && current != tail) current.`val` else -1
    }

    fun addAtHead(`val`: Int) {
        val prev = head
        val next = head.next
        val new = ListNode(`val`)

        head.next = new
        new.prev = head
        new.next = next
        next?.prev = new
    }

    fun addAtTail(`val`: Int) {
        val next = tail
        val prev = tail.prev
        val new = ListNode(`val`)

        tail.prev = new
        new.prev = prev
        new.next = tail
        prev?.next = new
    }

    fun addAtIndex(index: Int, `val`: Int) {
        var current = head.next
        var i = 0
        while( current != null && i != index) {
            current = current.next
            i++
        }
        if(current != null) {
            val prev = current.prev
            val new = ListNode(`val`)

            prev?.next = new
            new.prev = prev
            new.next = current
            current.prev = new
        }
    }

    fun deleteAtIndex(index: Int) {
        var current = head.next
        var i = 0
        while( current != null && i != index) {
            current = current.next
            i++
        }
        if(current != null && current != tail) {
            val prev = current.prev
            val next = current.next

            prev?.next = next
            next?.prev = prev
        }
    }

}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(`val`)
 * obj.addAtTail(`val`)
 * obj.addAtIndex(index,`val`)
 * obj.deleteAtIndex(index)
 */
