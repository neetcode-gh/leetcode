package kotlin

class Node(var `val`: Int) {
    var next: Node? = null
    var random: Node? = null
}

class Solution {
    fun copyRandomList(node: Node?): Node? {
        if (node == null) return null
        val hashMap = HashMap<Node, Node>()
        val dummyNode = Node(-1)
        var currentNode = node
        var currentResultantListNode: Node? = dummyNode
        // create the new linked list ignoring the random pointers
        while (currentNode != null) {
            val newNode = Node(currentNode.`val`)
            currentResultantListNode?.next = newNode
            // associate the node of the original list to the related new node
            hashMap[currentNode] = newNode
            currentResultantListNode = newNode
            currentNode = currentNode.next
        }
        currentNode = node
        currentResultantListNode = dummyNode.next
        // make the "random" pointers of each node in the new list,
        // match those of the original list
        while (currentNode != null) {
            if (currentNode.random != null) currentResultantListNode?.random = hashMap[currentNode!!.random]
            currentNode = currentNode.next
            currentResultantListNode = currentResultantListNode?.next
        }
        return dummyNode.next
    }
}