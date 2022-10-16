/**
 * Definition for singly-linked list.
 * class ListNode(_x: Int = 0, _next: ListNode = null) {
 *   var next: ListNode = _next
 *   var x: Int = _x
 * }
 */
object Solution {
    def mergeTwoLists(list1: ListNode, list2: ListNode): ListNode = {
        val head = new ListNode()
        var tail = head
        var (ptr1, ptr2) = (list1, list2)
        
        while (ptr1 != null && ptr2 != null) {
            if (ptr1.x <= ptr2.x) {
                tail.next = ptr1
                ptr1 = ptr1.next
            } else {
                tail.next = ptr2
                ptr2 = ptr2.next
            }
            
            tail = tail.next
        }
        
        if (ptr1 != null) {
            tail.next = ptr1
        } else if (ptr2 != null) {
            tail.next = ptr2
        }
        
        return head.next
    }
}