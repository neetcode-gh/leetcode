/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

func isSymmetric(root *TreeNode) bool {
	if root == nil {
		return true
	}

	q := []*TreeNode{root.Left, root.Right}

	for len(q) > 0 {
		left, right := q[0], q[1]
		q = q[2:]

		if left == nil && right == nil {
			continue
		}
		if (left == nil && right != nil) || (left != nil && right == nil) || left.Val != right.Val {
			return false
		}
		q = append(q, left.Left, right.Right, left.Right, right.Left)
	}

	return true
}