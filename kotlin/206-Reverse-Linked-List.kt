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
    fun reverseList(head: ListNode?): ListNode? {
        if (head == null)
            return head

        var prev: ListNode? = null
        var curr = head

        while (curr != null) {
            val next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }

        return prev
    }

    fun reverseListRecursive(head: ListNode?): ListNode? {
        if (head == null || head.next == null)
            return head

        val newHead = reverseList(head.next)
        head.next.next = head
        head.next = null

        return newHead
    }
}