/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun swapPairs(head: ListNode?): ListNode? {
        var dummy = ListNode(0, head)
        var prev = dummy
        var cur = head

        while (cur != null && cur.next != null) {
            val next = cur.next
            val nextNext = cur.next.next

            next.next = cur
            cur.next = nextNext
            prev.next = next

            prev = cur
            cur = nextNext
        }

        return dummy.next
    }
}
