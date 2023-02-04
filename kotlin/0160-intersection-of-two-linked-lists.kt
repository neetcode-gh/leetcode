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
    fun getIntersectionNode(headA:ListNode?, headB:ListNode?):ListNode? {
        var a = headA
        var b = headB
        while (a != b) {
            a = if(a != null) a.next else headB
            b = if(b != null) b.next else headA
        }
        return a
    }
}
