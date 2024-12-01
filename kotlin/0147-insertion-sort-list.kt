class Solution {
    fun insertionSortList(head: ListNode?): ListNode? {
        val dummy = ListNode(0)
        dummy.next = head
        var prev = head
        var cur = head?.next

        while (cur != null) {
            if (prev != null && cur.value >= prev.value) {
                prev = cur
                cur = cur.next
                continue
            }

            var temp = dummy
            while (cur.value > temp.next.value) 
                temp = temp.next
            prev?.next = cur.next
            cur.next = temp.next
            temp.next = cur
            cur = prev?.next
        }

        return dummy.next
    }

    val ListNode.value
        get() = this.`val`
}
