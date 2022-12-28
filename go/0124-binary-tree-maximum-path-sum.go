/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func maxPathSum(root *TreeNode) int {
	arr := []int{math.MinInt32}
	maxPathSumUtil(root, arr)
	return arr[0]
}

func maxPathSumUtil(root *TreeNode, arr []int) int {
	if root == nil {
		return 0
	}

	left := max(0, maxPathSumUtil(root.Left, arr))
	right := max(0, maxPathSumUtil(root.Right, arr))
	arr[0] = max(arr[0], root.Val+left+right)

	return root.Val + max(left, right)
}

func max(a, b int) int {
	if a > b {
		return a
	}

	return b
}