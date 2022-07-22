package balancedbinarytree

import "math"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func isBalanced(root *TreeNode) bool {
	if root == nil {
		return true
	}

	leftHeight := heightOfBinaryTree(root.Left)
	rightHeight := heightOfBinaryTree(root.Right)
	if math.Abs(float64(leftHeight)-float64(rightHeight)) > 1 {
		return false
	}
	return isBalanced(root.Left) && isBalanced(root.Right)

}

func heightOfBinaryTree(root *TreeNode) int {
	if root == nil {
		return -1
	}
	leftHeight := heightOfBinaryTree(root.Left)
	rightHeight := heightOfBinaryTree(root.Right)
	return 1 + max(leftHeight, rightHeight)
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}
