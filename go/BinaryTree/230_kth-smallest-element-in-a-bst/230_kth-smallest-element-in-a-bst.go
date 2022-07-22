package kthsmallestelementinabst

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func kthSmallest(root *TreeNode, k int) int {
	var count int
	node := kthSmallestUtil(root, k, &count)
	if node == nil {
		return -1
	}
	return node.Val
}

func kthSmallestUtil(root *TreeNode, k int, count *int) *TreeNode {
	if root == nil {
		return nil
	}
	left := kthSmallestUtil(root.Left, k, count)
	if left != nil {
		return left
	}
	*count++
	if *count == k {
		return root
	}

	return kthSmallestUtil(root.Right, k, count)
}
