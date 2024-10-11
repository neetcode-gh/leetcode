func isCompleteTree(root *TreeNode) bool {
	if root == nil {
		return true
	}

	nilNodeFound := false
	q := []*TreeNode{root}

	for len(q) > 0 {
		node := q[0]
		q = q[1:]

		if node == nil {
			nilNodeFound = true
		} else {
			if nilNodeFound {
				return false
			}
			q = append(q, node.Left)
			q = append(q, node.Right)
		}
	}
	return true
}