func removeElements(head *ListNode, val int) *ListNode {
	if head == nil {
		return nil
	}

	curr := head

	for curr.Next != nil {
		if curr.Next.Val == val {
			curr.Next = curr.Next.Next
		} else {
			curr = curr.Next
		}
	}

	if head.Val == val {
		return head.Next
	}

	return head
}