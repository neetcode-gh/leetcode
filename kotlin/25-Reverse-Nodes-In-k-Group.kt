package kotlin

class Solution {

    private fun reverse(startNode: ListNode?, endNode: ListNode?): ListNode? {
        if (startNode == null) return null
        var currentNode = startNode
        var temp: ListNode?
        var previousNode: ListNode? = null

        while (currentNode != null) {
            temp = currentNode.next
            currentNode.next = previousNode
            previousNode = currentNode
            if (currentNode === endNode) break
            currentNode = temp
        }

        return previousNode
    }

    private fun getKthNode(headNode: ListNode, k: Int): ListNode? {
        var currentNode: ListNode? = headNode
        var counter = 1
        while (currentNode != null && counter < k) {
            counter++
            currentNode = currentNode.next
        }
        return currentNode
    }

    fun reverseKGroup(head: ListNode?, k: Int): ListNode? {
        if (head == null) return null

        val dummyNode = ListNode(-1).apply { next = head }
        var kthNode: ListNode?
        var currentNode = head
        var previousNodeOfCurrentGroup = dummyNode
        var nextNodeOfCurrentGroup: ListNode?

        while (currentNode != null) {
            kthNode = getKthNode(currentNode, k)
            if (kthNode == null) break
            nextNodeOfCurrentGroup = kthNode.next
            previousNodeOfCurrentGroup.next = reverse(startNode = currentNode, endNode = kthNode)
            currentNode.next = nextNodeOfCurrentGroup
            previousNodeOfCurrentGroup = currentNode
            currentNode = nextNodeOfCurrentGroup
        }

        return dummyNode.next
    }


}