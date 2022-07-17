package reorderlist

import "fmt"

type ListNode struct {
	Val  int
	Next *ListNode
}

func reorderList(head *ListNode) {
	if head == nil {
		return
	}
	fast := head.Next
	slow := head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	secondHalfList := slow.Next
	slow.Next = nil
	secondHalfList = reverseList(secondHalfList)

	firstHalfList := head

	for secondHalfList != nil {
		tempFirstListNode, tempSecondListNode := firstHalfList.Next, secondHalfList.Next
		firstHalfList.Next = secondHalfList     // insert between
		secondHalfList.Next = tempFirstListNode // join first half after inserting in between
		firstHalfList = tempFirstListNode
		secondHalfList = tempSecondListNode
	}
}

func reverseList(head *ListNode) *ListNode {
	if head == nil {
		return nil
	}
	var previousNode *ListNode
	currentNode := head
	for currentNode != nil {
		tempNode := currentNode.Next
		currentNode.Next = previousNode
		previousNode = currentNode
		currentNode = tempNode // for the last value currentNode will become nil and previous will store all the nodes
	}

	head = previousNode
	return head
}

func printList(head *ListNode) {
	for head != nil {
		fmt.Print(head.Val)
		fmt.Print(" ")
		head = head.Next
	}
	fmt.Println(" ")
}
