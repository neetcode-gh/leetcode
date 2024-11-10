// Slow and Fast Pointer Method
/**
 * Question Link: https://leetcode.com/problems/reorder-list/
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
class ReorderList {
    func reorderList(_ head: ListNode?) {
        var slow = head
        var fast = head?.next

        while fast != nil || fast?.next != nil {
            slow = slow?.next
            fast = fast?.next?.next
        }

        var second = slow?.next
        slow?.next = nil
        var prev: ListNode?

        while second != nil {
            var temp = second?.next
            second?.next = prev
            prev = second
            second = temp
        }

        var first = head
        second = prev

        while second != nil {
            var temp1 = first?.next
            var temp2 = second?.next
            first?.next = second
            second?.next = temp1
            first = temp1
            second = temp2
        }
    }
}

// Deque 
import DequeModule

class Solution {
    func reorderList(_ head: ListNode?) {
        var queue = Deque<ListNode>()
        var curr = head
        while curr != nil {
            queue.append(curr!)
            curr = curr!.next
        }
        var lastNode: ListNode?
        while !queue.isEmpty {
            let leftNode = queue.popFirst()
            let rightNode = queue.popLast()
            rightNode?.next = nil
            leftNode?.next = rightNode
            lastNode?.next = leftNode
            lastNode = rightNode
        }
    }
}

