package lowestcommonancesstor

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
	current := root
	for current != nil {
		if p.Val > current.Val && q.Val > current.Val {
			current = current.Right
		} else if p.Val < current.Val && q.Val < current.Val {
			current = current.Left
		} else {
			break
		}
	}
	return current
}

func lowestCommonAncestorRecursion(root, p, q *TreeNode) *TreeNode {

	if p.Val > root.Val && q.Val > root.Val {
		return lowestCommonAncestor(root.Right, p, q)
	} else if p.Val < root.Val && q.Val < root.Val {
		return lowestCommonAncestor(root.Left, p, q)
	}
	return root
}
