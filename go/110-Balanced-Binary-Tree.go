package leetcode

import (
	"math"
)

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func isBalanced(root *TreeNode) bool {

	if root == nil {
		return true
	}

	left := findHeight(root.Left)
	right := findHeight(root.Right)

	return math.Abs(float64(left)-float64(right)) <= 1 && isBalanced(root.Left) && isBalanced(root.Right)

}

func findHeight(node *TreeNode) int {

	if node == nil {
		return 0
	}

	return 1 + int(math.Max(float64(findHeight(node.Left)), float64(findHeight(node.Right))))
}
