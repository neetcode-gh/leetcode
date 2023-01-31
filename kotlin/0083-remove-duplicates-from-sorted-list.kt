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
    fun deleteDuplicates(head: ListNode?): ListNode? {
        var dummy = ListNode(Integer.MAX_VALUE, head)
        var prev = dummy
        var current = head
        
        while(current != null) {
            if(current.`val` == prev.`val`)
                prev.next = current.next
            else 
                prev = current
            current = current.next
        }

        return dummy.next
    }
}
