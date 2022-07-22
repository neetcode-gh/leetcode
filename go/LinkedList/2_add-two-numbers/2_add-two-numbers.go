package addtwonumbers

type ListNode struct {
	Val  int
	Next *ListNode
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	dummyHead := &ListNode{}
	current := dummyHead
	carry := 0
	l1Value := 0
	l2Value := 0
	for l1 != nil || l2 != nil || carry != 0 {
		if l1 != nil {
			l1Value = l1.Val
		} else {
			l1Value = 0
		}
		if l2 != nil {
			l2Value = l2.Val
		} else {
			l2Value = 0
		}
		sum := l1Value + l2Value + carry
		carry = sum / 10
		newNode := &ListNode{
			Val:  (sum % 10),
			Next: nil,
		}
		current.Next = newNode
		current = newNode
		if l1 != nil {
			l1 = l1.Next
		}
		if l2 != nil {
			l2 = l2.Next
		}

	}
	return dummyHead.Next

}
