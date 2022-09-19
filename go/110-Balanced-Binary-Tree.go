func isBalanced(root *TreeNode) bool {
	return isBalancedUtil(root) != math.MaxUint32
}

func isBalancedUtil(root *TreeNode) int {
	if root == nil {
		return 0
	}

	left := isBalancedUtil(root.Left)
	right := isBalancedUtil(root.Right)

	if left == math.MaxUint32 || right == math.MaxUint32 {
		return math.MaxUint32
	}

	if math.Abs(float64(left-right)) > 1 {
		return math.MaxUint32
	}

	if left > right {
		return left + 1
	}

	return right + 1
}