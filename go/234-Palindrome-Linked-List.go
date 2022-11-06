/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

func isPalindrome(head *ListNode) bool {

	slow, fast := head, head

	// finding the middle with 2 pointer method
	for true {
		if fast == nil {
			break
		}
		if fast.Next == nil {
			break
		}
		fast = fast.Next.Next
		slow = slow.Next
	}

	// slow is the middle
	// reversing the 2nd half of the linked list
	var prev *ListNode = nil
	cur := slow

	for cur != nil {
		temp := cur.Next
		cur.Next = prev
		prev = cur
		cur = temp
	}

	left, right := head, prev

	// comparing the 2 halves
	for right != nil && left != nil {
		if (*left).Val != (*right).Val {
			return false
		}
		left = left.Next
		right = right.Next
	}
	return true
}