/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
 func insertionSortList(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}
	dummy := new(ListNode)
	dummy.Next = head
	cur := head.Next
	prev := head
	for cur != nil {
		if cur.Val >= prev.Val {
			prev = cur
			cur = cur.Next
		} else {
			pos := dummy
			next := cur.Next
			for pos.Next != nil && cur.Val >= pos.Next.Val {
				pos = pos.Next
			}
			prev.Next = cur.Next
			cur.Next = pos.Next
			pos.Next = cur
			cur = next
		}
	}
	return dummy.Next
}
