package main

import (
	"fmt"
)

type ListNode struct {
	val  int
	Next *ListNode
}

func main() {

	list3 := ListNode{4, nil}
	list2 := ListNode{3, &list3}
	list1 := ListNode{2, &list2}
	fmt.Println(reverseList(&list1).val)
}

// iteratively
/*
func reverseList(head *ListNode) *ListNode {
	var previous, current *ListNode = nil, head
	var temp *ListNode
	for current != nil {
		temp = current.Next
		current.Next = previous
		previous = current
		current = temp
	}
	return previous
}
*/
// recursively

func reverseList(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}
	var newHead *ListNode
	newHead = reverseList(head.Next)
	head.Next.Next = head
	head.Next = nil
	return newHead

}
