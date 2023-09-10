/**
 * Question Link: https://leetcode.com/problems/reverse-nodes-in-k-group/
 */

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

class ReverseKGroup {
    func reverseKGroup(_ head: ListNode?, _ k: Int) -> ListNode? {
        var dummy = ListNode(0, head)
        var groupPrev: ListNode? = dummy

        while true {
            let kth = getKth(current: groupPrev, k: k)
            if kth == nil {
                break
            }

            let groupNext = kth?.next

            var prev = kth?.next
            var current = groupPrev?.next
            while current !== groupNext {
                let temp = current?.next
                current?.next = prev
                prev = current
                current = temp
            }

            let temp = groupPrev?.next
            groupPrev?.next = kth
            groupPrev = temp
        }

        return dummy.next
    }

    func getKth(current: ListNode?, k: Int) -> ListNode? {
        var current = current
        var k = k
        
        while current != nil && k > 0 {
            current = current?.next
            k -= 1
        }

        return current
    }
}