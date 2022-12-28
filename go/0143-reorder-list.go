/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
 func reorderList(head *ListNode)  {
    slow := head
    fast := head.Next
    
    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
    }
    
    reversed := reverse(slow.Next)
    slow.Next = nil
    
    curr := head
    
    for curr != nil && reversed != nil {
        next := curr.Next
        revNext := reversed.Next
        curr.Next = reversed
        reversed.Next = next
        curr = next
        reversed = revNext
    }
}

func reverse(node *ListNode) *ListNode {
    var prev, curr *ListNode = nil, node
    
    for curr != nil {
        next := curr.Next
        curr.Next = prev
        prev = curr
        curr = next
    }
    
    return prev
}