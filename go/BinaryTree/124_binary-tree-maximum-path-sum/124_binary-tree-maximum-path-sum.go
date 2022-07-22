package binarytreemaximumpathsum

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func maxPathSum(root *TreeNode) int {
	var maxValue int
	maxVal := 1 << 32
	minVal := maxVal * -1
	maxValue = minVal
	var maxPathAtNode func(root *TreeNode) int
	maxPathAtNode = func(root *TreeNode) int {
		if root == nil {
			return 0
		}
		leftMax := maxPathAtNode(root.Left)
		rightMax := maxPathAtNode(root.Right)
		leftMax = max(leftMax, 0)
		rightMax = max(rightMax, 0)
		// If the split has happened
		maxValue = max(maxValue, leftMax+rightMax+root.Val)
		return root.Val + max(leftMax, rightMax)
	}
	maxPathAtNode(root)
	return maxValue
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}
