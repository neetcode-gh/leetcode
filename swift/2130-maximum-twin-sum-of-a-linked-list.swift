/**
 * Question Link: https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/
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
class Solution {
    func pairSum(_ head: ListNode?) -> Int {
        var slow = head
        var fast = head
        var prev: ListNode?
        while fast != nil && fast?.next != nil {
            fast = fast?.next?.next
            var tmp = slow?.next
            slow?.next = prev
            prev = slow
            slow = tmp
        }
        var res = 0
        while slow != nil {
            res = max(res, prev!.val + slow!.val)
            prev = prev?.next
            slow = slow?.next
        }
        return res
    }
}