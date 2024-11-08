class MyHashSet() {

    class LN(val value: Int) {
        var next: LN? = null
    }
    
    val set = Array (10000) { LN(0) }

    fun add(key: Int) {
        var cur = set[hash(key)]
        while (cur?.next != null) {
            if (cur?.next?.value == key)
                return
            cur = cur?.next!!
        }
        cur.next = LN(key)
    }

    fun remove(key: Int) {
        var cur = set[hash(key)]
        while (cur?.next != null) {
            if (cur?.next?.value == key) {
                cur?.next = cur?.next?.next
                return
            }
            cur = cur?.next!!
        }
    }

    fun contains(key: Int): Boolean {
        var cur = set[hash(key)]
        while (cur?.next != null) {
            if (cur?.next?.value == key) {
                return true
            }
            cur = cur?.next!!
        }
        return false
    }
    
    private fun hash(key: Int) = key % set.size

}
