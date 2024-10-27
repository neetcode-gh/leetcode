/**
 * Question Link: https://leetcode.com/problems/linked-list-cycle-ii
*/

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.next = nil
 *     }
 * }
 */

class Solution {
    func detectCycle(_ head: ListNode?) -> ListNode? {
        var slow = head
        var fast = head
        while fast != nil && fast?.next != nil {
            slow = slow?.next
            fast = fast?.next?.next
            if slow === fast {
                break
            }
        }
        if fast == nil || fast?.next == nil {
            return nil
        }
        var slow2 = head
        while slow !== slow2 {
            slow = slow?.next
            slow2 = slow2?.next
        }
        return slow
    }
}