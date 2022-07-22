package diameterofbinarytree

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

var maxDiameter int = 0

func diameterOfBinaryTree(root *TreeNode) int {
	maxDiameter = 0
	dfs(root)
	return maxDiameter
}

func dfs(root *TreeNode) int {
	if root == nil {
		return -1
	}
	leftHeight := dfs(root.Left)
	rightHeight := dfs(root.Right)
	diameter := leftHeight + rightHeight + 2
	maxDiameter = max(maxDiameter, diameter)
	return 1 + max(leftHeight, rightHeight)
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}
