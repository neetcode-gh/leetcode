/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeInBetween(list1 *ListNode, a int, b int, list2 *ListNode) *ListNode {
	curr := list1
	i := 0
	for i < a-1 {
		curr = curr.Next
		i++
	}

	head := curr
	for i <= b {
		curr = curr.Next
		i++
	}
	head.Next = list2

	for list2.Next != nil {
		list2 = list2.Next
	}

	list2.Next = curr

	return list1
}
