class ChainNode(
    var key: Int = -1,
    var value: Int = -1
) {
    var next: ChainNode? = null
}

class MyHashMap() {

    val hashMap = Array(1000) { ChainNode() }

    fun put(key: Int, value: Int) {
        var current: ChainNode? = hashMap[key % hashMap.size]
        while(current?.next != null) {
            if(current.next?.key == key) {
                current.next?.value = value
                return
            }
            current = current?.next
        }
        current?.next = ChainNode(key, value)
    }

    fun get(key: Int): Int {
        var current: ChainNode? = hashMap[key % hashMap.size].next
        while(current != null) {
            if(current.key == key) return current.value
            current = current.next
        }
        return -1
    }

    fun remove(key: Int) {
        var current: ChainNode? = hashMap[key % hashMap.size]
        while(current != null && current.next != null) {
            if(current.next?.key == key) {
                current.next = current.next?.next
                return
            }
            current = current.next
        }
    }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
