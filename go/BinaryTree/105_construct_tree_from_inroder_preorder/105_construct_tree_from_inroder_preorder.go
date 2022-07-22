package constructtreefrominroderpreorder

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func buildTree(preorder []int, inorder []int) *TreeNode {
	if len(preorder) == 0 || len(inorder) == 0 {
		return nil
	}
	rootNode := &TreeNode{
		Val: preorder[0],
	}
	// midPoint := slices.Index(inorder, preorder[0]) In go 1.18 you can do this simply
	midPoint := Index(inorder, preorder[0])
	rootNode.Left = buildTree(preorder[1:midPoint+1], inorder[:midPoint])
	rootNode.Right = buildTree(preorder[midPoint+1:], inorder[midPoint+1:])

	return rootNode
}

func Index(arr []int, element int) int {
	for key, val := range arr {
		if val == element {
			return key
		}
	}
	return -1
}
