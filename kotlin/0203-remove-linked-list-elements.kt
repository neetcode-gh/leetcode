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
    fun removeElements(head: ListNode?, `val`: Int): ListNode? {

        var dummy = ListNode(0, head)
        var current = head
        var prev = dummy

        while(current != null) {
            if(current?.`val` == `val`)
                prev.next = current.next
            else
                prev = current
            current = current.next
        }

        return dummy.next
    }
}
