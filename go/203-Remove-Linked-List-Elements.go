/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */

 func removeElements(head *ListNode, val int) *ListNode {

	var prev *ListNode = nil
	cur := head
	for cur != nil {
		
		// Handling edge case: First element is to be deleted
		if cur.Val == val && cur == head {
			head = head.Next
			cur = head
			continue
		}

		if cur.Val == val { 
			// found element to be deleted
			prev.Next = cur.Next
			cur = cur.Next
		} else {
			prev = cur
			cur = cur.Next
		}
	}
	return head
}