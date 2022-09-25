/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
	ptr1, ptr2 := list1, list2
	head := &ListNode{} // dummy node technique to deal with null lists
	tail := head

	for ptr1 != nil && ptr2 != nil {
		if ptr1.Val <= ptr2.Val {
			tail.Next = ptr1
			ptr1 = ptr1.Next
		} else {
			tail.Next = ptr2
			ptr2 = ptr2.Next
		}

		tail = tail.Next
	}

	if ptr1 != nil {
		tail.Next = ptr1
	} else if ptr2 != nil {
		tail.Next = ptr2
	}

	return head.Next
}