package validatebinarysearchtree

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func isValidBST(root *TreeNode) bool {
	max := 1 << 32
	left := -1 * max
	right := max
	return isValidBSTUtil(root, left, right)
}

func isValidBSTUtil(root *TreeNode, left int, right int) bool {
	if root == nil {
		return true
	}

	if !(root.Val > left && root.Val < right) {
		return false
	}
	return isValidBSTUtil(root.Left, left, root.Val) && isValidBSTUtil(root.Right, root.Val, right)
}
