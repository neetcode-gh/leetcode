package main

import "math"

func main() {

}

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func minDiffInBST(root *TreeNode) int {
	var prev *TreeNode
	res := math.MaxInt

	var dfs func(*TreeNode)

	dfs = func(node *TreeNode) {
		if node != nil {
			dfs(node.Left)

			if prev != nil {
				res = min(res, node.Val-prev.Val)
			}
			prev = node

			dfs(node.Right)
		}
	}

	dfs(root)
	return res
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
