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
    fun reorderList(head: ListNode?): Unit {
        if (head == null || head.next == null)
            return

        var slow = head
        var fast = head.next

        while (fast != null && fast.next != null && slow != null) {
            fast = fast.next.next
            slow = slow.next
        }

        var reversed = reverse(slow!!.next)
        slow.next = null
        var curr = head

        while (curr != null && reversed != null) {
            val next = curr.next
            val revNext = reversed.next
            curr.next = reversed
            reversed.next = next
            curr = next
            reversed = revNext
        }
    }

    fun reverse(node: ListNode?): ListNode? {
        var prev: ListNode? = null
        var curr = node

        while (curr != null) {
            var next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }

        return prev
    }
}