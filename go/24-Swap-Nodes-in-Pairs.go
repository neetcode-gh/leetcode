/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
 func swapPairs(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }
    
    next := head.Next
    swapped := swapPairs(next.Next)
    
    next.Next, head.Next = head, swapped
    
    return next
}