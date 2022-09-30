/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
	if l1 == nil {
		return l2
	}

	if l2 == nil {
		return l1
	}

	ptr1, ptr2 := l1, l2

	result := new(ListNode)

	temp := result

	for ptr1 != nil && ptr2 != nil {
		if ptr1.Val < ptr2.Val {
			temp.Next = ptr1
			temp = temp.Next
			ptr1 = ptr1.Next
		} else {
			temp.Next = ptr2
			temp = temp.Next
			ptr2 = ptr2.Next
		}
	}

	for ptr1 != nil{
		temp.Next = ptr1
		temp = temp.Next
		ptr1 = ptr1.Next
	}

	for ptr2 != nil{
		temp.Next = ptr2
		temp = temp.Next
		ptr2 = ptr2.Next
	}

	result = result.Next
	return result
}