package binarytreerightsideview

import "container/list"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func rightSideView(root *TreeNode) []int {
	var result []int
	if root == nil {
		return result
	}
	queue := list.New()
	queue.PushBack(root)
	for queue.Len() > 0 {
		var rightSideElem *TreeNode
		numberOfNodes := queue.Len()
		for numberOfNodes > 0 {
			poppedVal := queue.Remove(queue.Front()).(*TreeNode)
			if poppedVal != nil {
				rightSideElem = poppedVal
				queue.PushBack(poppedVal.Left)
				queue.PushBack(poppedVal.Right)
			}
			numberOfNodes--
		}
		if rightSideElem != nil {
			result = append(result, rightSideElem.Val)
		}
	}
	return result
}
