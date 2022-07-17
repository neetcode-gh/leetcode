package removenthnodefromendoflist

type ListNode struct {
	Val  int
	Next *ListNode
}

func removeNthFromEnd(head *ListNode, n int) *ListNode {
	fast := head
	slow := head

	// Logic is to remove nth element from end the slow pointer needs to move
	// len(list) - n from the begining
	// for eg: if we want to remove last 2nd element
	// move the fast pointer by 2 and then move both slow pointer and fast pointer
	// in equal pace till fast pointer is at the end of the list.
	// If fast pointer is at the end it implies slow pointer is at the position where we
	// want to delete the node.

	// move the fast pointer n steps to maintain distance between fast and slow pointer as n
	for i := 1; i <= n; i++ {
		fast = fast.Next
	}

	//remove the first element from the list
	if fast == nil {
		return slow.Next
	}

	for fast.Next != nil {
		fast = fast.Next
		slow = slow.Next
	}
	slow.Next = slow.Next.Next

	return head

}
