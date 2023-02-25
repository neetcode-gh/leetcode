/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func hasPathSum(root *TreeNode, targetSum int) bool {
	if root == nil {
		return false
	}
	if isChild(root) && targetSum == root.Val {
		return true
	}
	if hasPathSum(root.Left, targetSum-root.Val) || hasPathSum(root.Right, targetSum-root.Val) {
		return true
	}
	return false
}

func isChild(node *TreeNode) bool {
	return node.Left == nil && node.Right == nil
}