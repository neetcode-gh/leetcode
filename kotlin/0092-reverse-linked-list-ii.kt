class Solution {
    fun reverseBetween(head: ListNode?, left: Int, right: Int): ListNode? {
        val dummy: ListNode? = ListNode(0)
        dummy?.next = head

        var cur = dummy
        repeat (left - 1) {
            cur = cur?.next
        }

        var pre = cur
        var start = cur?.next
        var end = start?.next

        repeat (right - left) {
            start?.next = end?.next
            end?.next = pre?.next
            pre?.next = end
            end = start?.next
        }
        
        return dummy?.next
    }
}
