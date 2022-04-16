package leetcode

type ListNode struct {
	Val  int
	Next *ListNode
}

func NewListNode(val int, next *ListNode) *ListNode {
	var n ListNode
	n.Next = next
	n.Val = val
	return &n
}

func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {

	var result = make([]int, 0)

	for list1 != nil || list2 != nil {
		if list1 == nil {
			result = append(result, list2.Val)
			list2 = list2.Next
			continue
		} else if list2 == nil {
			result = append(result, list1.Val)
			list1 = list1.Next
			continue
		}

		if list1.Val < list2.Val {
			result = append(result, list1.Val)
			list1 = list1.Next
		} else {
			result = append(result, list2.Val)
			list2 = list2.Next
		}
	}

	var list *ListNode

	for i := len(result) - 1; i >= 0; i-- {
		list = NewListNode(result[i], list)
	}

	return list

}
