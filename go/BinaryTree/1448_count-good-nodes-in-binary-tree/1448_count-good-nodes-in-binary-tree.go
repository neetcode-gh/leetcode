package countgoodnodesinbinarytree

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func goodNodes(root *TreeNode) int {
	maxValue := root.Val
	return goodNodesUtil(root, maxValue)
}

func goodNodesUtil(node *TreeNode, maxValue int) int {
	var result int
	if node == nil {
		return 0
	}
	if node.Val >= maxValue {
		result = 1
	} else {
		result = 0
	}
	maxValue = max(node.Val, maxValue)
	result += goodNodesUtil(node.Left, maxValue)
	result += goodNodesUtil(node.Right, maxValue)
	return result
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}
