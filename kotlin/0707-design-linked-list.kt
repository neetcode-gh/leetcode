class MyLinkedList() {
    val head = LN(0)
    val tail = LN(0)
    
    init {
        head.next = tail
        tail.prev = head
    }

    fun get(index: Int): Int {
        var current = head.next
        var i = 0
        while (current != null && i != index) {
            current = current.next
            i++
        }
        
        return if (current != null && current != tail) current.`val` else -1
    }

    fun addAtHead (`val`: Int) {
        val prev = head
        val next = head.next
        val new = LN(`val`)

        head.next = new
        new.prev = head
        new.next = next
        next?.prev = new
    }

    fun addAtTail(`val`: Int) {
        val next = tail
        val prev = tail.prev
        val new = LN(`val`)

        tail.prev = new
        new.prev = prev
        new.next = tail
        prev?.next = new
    }

    fun addAtIndex(index: Int, `val`: Int) {
        var current = head.next
        var i = 0
        while (current != null && i != index) {
            current = current.next
            i++
        }

        if (current != null) {
            val prev = current.prev
            val new = LN(`val`)

            prev?.next = new
            new.prev = prev
            new.next = current
            current.prev = new
        }
    }

    fun deleteAtIndex(index: Int) {
        var current = head.next
        var i = 0
        while (current != null && i != index) {
            current = current.next
            i++
        }

        if (current != null && current != tail) {
            val prev = current.prev
            val next = current.next

            prev?.next = next
            next?.prev = prev
        }
    }
}

class LN (
    var `val`: Int,
    var next: LN? = null,
    var prev: LN? = null
)
