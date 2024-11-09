class Solution {
    fun partition(head: ListNode?, x: Int): ListNode? {
        var leftPart = ListNode(0)
        val rightPart = ListNode(0)

        var cur = head
        var left = leftPart
        var right = rightPart

        while (cur != null) {
            if (cur.`val` < x) {
                left?.next = cur
                left = left?.next
            } else {
                right?.next = cur
                right = right?.next
            }
            cur = cur?.next
        }

        right?.next = null
        left?.next = rightPart?.next
        return leftPart?.next
    }
}
