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
    func removeNthFromEnd(_ head: ListNode?, _ n: Int) -> ListNode? {
        if head === nil {
            return head
        }
        var slow = head, fast = head
        for i in 1...n + 1 {
            if (slow === nil) {
                return head?.next
            }
            slow = slow?.next
        }
        
        while slow != nil {
            slow = slow?.next
            fast = fast?.next
        }
        fast?.next = fast?.next?.next
        return head
    }
}