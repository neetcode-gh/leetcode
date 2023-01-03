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

	return dfs(root, 0, targetSum)
}

func dfs(root *TreeNode, curSum, targetSum int) bool {
	if root == nil {
		return false
	}
	curSum += root.Val
	if curSum == targetSum && root.Left == nil && root.Right == nil {
		return true
	}
	return dfs(root.Left, curSum, targetSum) || dfs(root.Right, curSum, targetSum)
}
