class LFUCache(val capacity: Int) {
    var lfuCnt = 0
    val valueMap = HashMap<Int, Int>()
    val countMap = HashMap<Int, Int>()
    val listMap = HashMap<Int, LinkedList>()

    fun counter(key: Int) {
        val cnt = countMap.getOrPut(key) { 0 }
        countMap[key] = countMap.getOrDefault(key, 0) + 1
        listMap.getOrPut(cnt) { LinkedList() }.apply { pop(key) }
        listMap.getOrPut(cnt + 1) { LinkedList() }.apply  { pushRight(key) }

        if (cnt == lfuCnt && (listMap[cnt]?.length() ?: 0) == 0)
            lfuCnt++
    }

    fun get(key: Int): Int {
        valueMap[key]?.let { counter(key) }
        return valueMap[key] ?: -1
    }

    fun put(key: Int, value: Int) {
        if (capacity == 0) return

        if (key !in valueMap && valueMap.size == capacity) {
            listMap[lfuCnt]?.let {
                val toDel = it.popLeft()
                valueMap.remove(toDel)
                countMap.remove(toDel)
            }
        }

        valueMap[key] = value
        counter(key)
        lfuCnt = minOf(lfuCnt, (countMap[key] ?: lfuCnt))
    }

}

class LinkedList {
    
    val left = ListNode(0)
    var right = ListNode(0)
    val map = HashMap<Int, ListNode?>()

    init {
        right.prev = left
        left.next = right
    }

    fun length() = map.size
    
    fun pushRight(value: Int) {
        val node = ListNode(value, right.prev, right)
        map[value] = node
        right.prev = node
        node.prev?.next = node
    }

    fun pop(value: Int) {
        if (value in map) {
            val node = map[value]
            val next = node?.next
            val prev = node?.prev
            next?.prev = prev
            prev?.next = next
            map.remove(value)
        }
    }

    fun popLeft(): Int {
        val res = left.next?.value
        res?.let { pop(it) }
        return res ?: -1
    }

    fun update(value: Int) {
        pop(value)
        pushRight(value)
    }

    class ListNode(
        var value: Int,
        var prev: ListNode? = null,
        var next: ListNode? = null
    )
}
