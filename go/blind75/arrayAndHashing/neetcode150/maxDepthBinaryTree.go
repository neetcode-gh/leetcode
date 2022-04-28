package main

import (
	"fmt"
)

type TreeNode struct {
	val   int
	Left  *TreeNode
	Right *TreeNode
}

func main() {
	//var left1 = &TreeNode{5, nil, nil}
	var right = &TreeNode{3, nil, nil}
	var left = &TreeNode{1, nil, nil}
	var root = &TreeNode{2, left, right}
	//var root = &TreeNode{2, nil, nil}
	//var root *TreeNode
	ans := maxDepthBinaryTree(root)
	fmt.Println(ans)
}

// recursive
/*
func maxDepthBinaryTree(root *TreeNode) int {
	if root == nil {
		return 0
	}

	return 1 + max(maxDepthBinaryTree(root.Left), maxDepthBinaryTree(root.Right))

}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
*/

// implement this using stack, iterative way
func maxDepthBinaryTree(root *TreeNode) int {
	if root == nil {
		return 0
	}
	count := 0
	q := []*TreeNode{}
	q = append(q, root)
	for len(q) > 0 {
		for i := 0; i < len(q); i++ {
			node := q[0]
			q = q[1:]
			if node.Left != nil {
				q = append(q, node.Left)
			}
			if node.Right != nil {
				q = append(q, node.Right)
			}
		}
		count++
	}
	return count

}
