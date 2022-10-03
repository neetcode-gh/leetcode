/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func addTwoNumbers(_ l1: ListNode?, _ l2: ListNode?) -> ListNode? {
        var itr1 = l1
        var itr2 = l2
        var carry: Int = 0
        var sum: Int = 0
        
        var dummy = ListNode(0)
        var head: ListNode? = dummy
        
        while itr1 != nil || itr2 != nil {
            let val1 = itr1?.val ?? 0
            let val2 = itr2?.val ?? 0
            
            sum = val1 + val2 + carry
            carry = sum/10
            sum = sum%10
            
            head?.next = ListNode(sum)
            head = head?.next
            
            itr1 = itr1?.next
            itr2 = itr2?.next           
         }
        
        if carry > 0 {
            head?.next = ListNode(carry)
        }
        
        return dummy.next
    }
}