package reverselinkedlist

type ListNode struct {
	Val  int
	Next *ListNode
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
