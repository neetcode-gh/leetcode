/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    if head == nil {
        return head
    }
    
    slow, fast := head, head
    for n > 0 {
        fast = fast.Next
        n--
    }
    
    if fast == nil {
        return slow.Next
    }
    
    for fast.Next != nil {
        slow = slow.Next
        fast = fast.Next
    }
    
    slow.Next = slow.Next.Next
    return head
}
