/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func diameterOfBinaryTree(root *TreeNode) int {
	maxLength := 0
	dfs(root, &maxLength)
	return maxLength
}

func dfs(t *TreeNode, maxLength *int) int {
	if t == nil {
		return 0
	}

	left := dfs(t.Left, maxLength)
	right := dfs(t.Right, maxLength)
	*maxLength = max(*maxLength, left+right)

	return max(left, right) + 1
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}