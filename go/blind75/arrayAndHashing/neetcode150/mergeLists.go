package main

import "fmt"

type ListNode struct {
	val  int
	Next *ListNode
}

func main() {
	list13 := ListNode{5, nil}
	list12 := ListNode{3, &list13}
	list1 := ListNode{1, &list12}

	list22 := ListNode{6, nil}
	list21 := ListNode{3, &list22}
	list2 := ListNode{2, &list21}

	res := mergeLists(&list1, &list2)

	for res != nil {
		fmt.Printf("%d ", res.val)
		res = res.Next
	}

}

func mergeLists(list1, list2 *ListNode) *ListNode {
	var result = &ListNode{0, nil}
	tail := result

	for list1 != nil && list2 != nil {
		if list1.val > list2.val {
			tail.Next = list2
			list2 = list2.Next
		} else {
			tail.Next = list1
			list1 = list1.Next
		}
		tail = tail.Next
	}

	if list1 == nil {
		tail.Next = list2
	} else {
		tail.Next = list1
	}

	return result.Next
}
