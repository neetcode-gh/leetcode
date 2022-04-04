func hasCycle(head *ListNode) bool {
	if head == nil || head.Next == nil {
        return false
    }
    slow := head
    fast := head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast {
            return true
        }
    }
    return false
}