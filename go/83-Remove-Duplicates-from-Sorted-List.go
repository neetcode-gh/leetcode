/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func deleteDuplicates(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}

	prev, curr := head, head.Next

	for curr != nil {
		for curr != nil && curr.Val == prev.Val {
			curr = curr.Next
			prev.Next = curr
		}

		if curr != nil {
			prev, curr = curr, curr.Next
		}
	}

	return head
}