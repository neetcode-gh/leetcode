package kotlin

private class Node(
    val key: Int,
    var value: Int,
    var next: Node? = null,
    var previous: Node? = null
)

class LRUCache(private val capacity: Int) {
    private val head = Node(0, 0)
    private val tail = Node(0, 0)
    private val hashMap = HashMap<Int, Node>()

    init {
        head.next = tail
        tail.previous = head
    }

    fun get(key: Int): Int {
        if (key !in hashMap) return -1
        val nodeToBeRemoved = hashMap.getValue(key)
        removeNode(nodeToBeRemoved)
        insertAtEnd(nodeToBeRemoved)
        return nodeToBeRemoved.value
    }

    fun put(key: Int, value: Int) {
        if (key in hashMap) {
            val nodeToBeMoved = hashMap.getValue(key).apply { this.value = value }
            removeNode(nodeToBeMoved)
            insertAtEnd(nodeToBeMoved)
            return
        }
        if (hashMap.size == capacity) {
            val nodeToRemove = head.next!!
            removeNode(nodeToRemove)
            hashMap.remove(nodeToRemove.key)
        }
        val newNode = Node(key, value)
        insertAtEnd(newNode)
        hashMap[key] = newNode
    }

    private fun insertAtEnd(node: Node) {
        node.apply {
            previous = tail.previous
            next = tail
        }
        tail.previous!!.next = node
        tail.previous = node
    }

    private fun removeNode(node: Node) {
        node.previous?.next = node.next
        node.next?.previous = node.previous
    }
}