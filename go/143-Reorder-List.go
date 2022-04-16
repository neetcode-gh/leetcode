package leetcode

import (
	"math"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func reorderList(head *ListNode) {

	arr := make([]int, 0)

	loop := head

	for loop != nil {
		arr = append(arr, loop.Val)
		loop = loop.Next
	}

	sortedArr := make([]int, 0)

	for i := 0; i < int(math.Floor(float64(len(arr)/2))); i++ {
		sortedArr = append(sortedArr, arr[i])
		sortedArr = append(sortedArr, arr[len(arr)-1-i])
	}

	if len(arr)%2 != 0 {
		sortedArr = append(sortedArr, arr[int(math.Floor(float64(len(arr)/2)))])
	}

	for i := 0; i < len(sortedArr); i++ {
		head.Val = sortedArr[i]
		head = head.Next
	}

}
