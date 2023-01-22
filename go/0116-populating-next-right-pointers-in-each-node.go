/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Left *Node
 *     Right *Node
 *     Next *Node
 * }
 */

func connect(root *Node) *Node {
	populate(root)
	return root
}

func populate(node *Node) {
	if node == nil {
		return
	}
	if node.Left == nil {
		return
	}

	node.Left.Next = node.Right
	if node.Next != nil {
		node.Right.Next = node.Next.Left
	}
	populate(node.Left)
	populate(node.Right)
}
