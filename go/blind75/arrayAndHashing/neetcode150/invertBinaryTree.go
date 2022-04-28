package main

import "fmt"

type TreeNode struct {
	val   int
	Left  *TreeNode
	Right *TreeNode
}

func main() {

	var right = &TreeNode{3, nil, nil}
	var left = &TreeNode{1, nil, nil}
	var root = &TreeNode{2, left, right}
	ans := invertBinaryTree(root)
	fmt.Println(ans.val)
	fmt.Println(ans.Left.val)
	fmt.Println(ans.Right.val)

}

func invertBinaryTree(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	root.Left, root.Right = invertBinaryTree(root.Right), invertBinaryTree(root.Left)
	return root
}
