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

// Iterative
func reverseList(head *ListNode) *ListNode {

	var prev *ListNode
	for head != nil {
		next := head.Next
		head.Next = prev
		prev = head
		head = next
	}
	return prev
}

// Recursive
func reverseList_1(head *ListNode) *ListNode {
	var prev *ListNode
	var reversed *ListNode

	for head != nil {
		prev = head

		reversed = NewListNode(prev.Val, reversed)

		head = head.Next
	}
	return reversed
}
