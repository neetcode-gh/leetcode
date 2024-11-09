class Solution {
    fun rotateRight(head: ListNode?, _k: Int): ListNode? {
        head?: return null

        var length = 1
        var tail = head
        while (tail?.next != null) {
            tail = tail?.next
            length++
        }

        val k = _k % length
        if (k == 0) return head

        var cur = head
        for (i in 0 until (length - k - 1))
            cur = cur?.next
        
        val newHead = cur?.next
        cur?.next = null
        tail?.next = head

        return newHead
    }
}
