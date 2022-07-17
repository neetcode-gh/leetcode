package copylistwithrandompointer

type Node struct {
	Val    int
	Next   *Node
	Random *Node
}

func copyRandomList(head *Node) *Node {
	oldToNewNodeMap := make(map[*Node]*Node)
	dummy := head
	for dummy != nil {
		newNode := &Node{
			Val:    dummy.Val,
			Next:   nil,
			Random: nil,
		}
		oldToNewNodeMap[dummy] = newNode
		dummy = dummy.Next
	}
	dummy = head
	var newHead *Node
	for dummy != nil {
		newHead = oldToNewNodeMap[dummy]
		newHead.Next = oldToNewNodeMap[dummy.Next]
		newHead.Random = oldToNewNodeMap[dummy.Random]
		oldToNewNodeMap[dummy] = newHead
		dummy = dummy.Next
	}

	return oldToNewNodeMap[head]
}
