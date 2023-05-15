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
    fun swapNodes(head: ListNode?, k: Int): ListNode? {
        var cur = head
        repeat(k - 1) { cur = cur?.next }

        var left = cur

        var right = head
        while (cur?.next != null) {
            cur = cur?.next
            right = right?.next
        }

        left?.`val` = right?.`val`.also { right?.`val` = left?.`val` }   
        return head
    }

}
