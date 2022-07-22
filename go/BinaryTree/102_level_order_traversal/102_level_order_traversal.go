package levelordertraversal

import (
	"container/list"
	"fmt"
)

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func levelOrder(root *TreeNode) [][]int {
	height := heightOfTree(root)
	fmt.Println("Height", height)
	var levelOrderList [][]int
	for i := 0; i <= height; i++ {
		levelOrderTraversalUtil(root, i, &levelOrderList, i)
	}
	return levelOrderList
}

func levelOrderTraversalUtil(root *TreeNode, level int, arr *[][]int, index int) {
	if root == nil {
		return
	}
	if len(*arr) <= index {
		(*arr) = append((*arr), []int{})
	}
	if level == 0 {
		levelArr := (*arr)[index]
		levelArr = append(levelArr, root.Val)
		(*arr) = append((*arr), levelArr)
	}
	levelOrderTraversalUtil(root.Left, level-1, arr, index)
	levelOrderTraversalUtil(root.Right, level-1, arr, index)
}

func heightOfTree(root *TreeNode) int {
	if root == nil {
		return -1
	}
	return 1 + max(heightOfTree(root.Left), heightOfTree(root.Right))
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}

func levelOrderBFS(root *TreeNode) [][]int {
	var result [][]int
	queue := list.New()
	queue.PushBack(root)
	for queue.Len() > 0 {
		numberOfNodes := queue.Len()
		level := list.New()
		for numberOfNodes > 0 {
			node := queue.Remove(queue.Front()).(*TreeNode)
			if node != nil {
				level.PushBack(node.Val)
				queue.PushBack(node.Left)
				queue.PushBack(node.Right)
			}
			numberOfNodes--
		}
		if level.Len() > 0 {
			copyList(&result, level)
		}
	}
	return result
}

func copyList(result *[][]int, level *list.List) {
	var levelArr []int
	levelLen := level.Len()
	for levelLen > 0 {
		val := level.Remove(level.Front()).(int)
		levelArr = append(levelArr, val)
		levelLen--
	}
	(*result) = append(*result, levelArr)
}
