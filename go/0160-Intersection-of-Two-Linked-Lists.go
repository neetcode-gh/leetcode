/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func getIntersectionNode(headA, headB *ListNode) *ListNode {
	l1, l2 := headA, headB

	for l1 != l2 {
		if l1 != nil {
			l1 = l1.Next
		} else {
			l1 = headB
		}
		if l2 != nil {
			l2 = l2.Next
		} else {
			l2 = headA
		}
	}
	return l1
}
