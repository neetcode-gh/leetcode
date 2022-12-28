/**
 * Definition for singly-linked list.
 * class ListNode(var _x: Int = 0) {
 *   var next: ListNode = null
 *   var x: Int = _x
 * }
 */

object Solution {
    def hasCycle(head: ListNode): Boolean = {
        var (slowPtr, fastPtr) = (head, head)
        
        while (fastPtr != null && fastPtr.next != null) {
            slowPtr = slowPtr.next
            fastPtr = fastPtr.next.next
            
            if (slowPtr eq fastPtr) {
                return true
            }
        }
        
        return false
    }
}