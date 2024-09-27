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
