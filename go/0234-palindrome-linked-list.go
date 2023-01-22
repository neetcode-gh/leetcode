/**
Move slow and fast pointer along the list.
Slow pointer nodes are added to reversed list.
When no more fast move is possible, iterate
along slow and back along reversed list while
checking for value equality

Time: O(N)
Space: O(1)
**/

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func isPalindrome(head *ListNode) bool {
	slow, fast := head, head
	var rev *ListNode

	for fast != nil && fast.Next != nil {
		fast = fast.Next.Next
		next_slow := slow.Next
		slow.Next = rev
		rev = slow
		slow = next_slow
	}

	// if fast is not null, slow is middle  of
	// odd length list which is skipped
	// if fast is null, slow is first element of
	// the 2nd half of even length list
	if fast != nil {
		slow = slow.Next
	}

	for slow != nil {
		if slow.Val != rev.Val {
			return false
		}
		slow = slow.Next
		rev = rev.Next
	}

	return true
}
