func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	var dummy = new(ListNode)
	var l3 **ListNode = &dummy
	var carry int
	list1 := l1
	list2 := l2

	for (list1 != nil) || (list2 != nil) {
		l3 = &((*l3).Next)
		*l3 = new(ListNode)
		var sum int

		if list1 != nil {
			sum += list1.Val
			list1 = list1.Next
		}

		if list2 != nil {
			sum += list2.Val
			list2 = list2.Next
		}

		(*l3).Val = (sum + carry) % 10
		carry = (sum + carry) / 10
	}

	if carry > 0 {
		l3 = &((*l3).Next)
		*l3 = new(ListNode)
		(*l3).Val = carry
	}

	return dummy.Next
}