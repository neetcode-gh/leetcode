package linkedlistcycle

type ListNode struct {
	Val  int
	Next *ListNode
}

func hasCycle(head *ListNode) bool {
	//Creating a hashmap to store the list of pointers which are already seen
	hashMap := make(map[*ListNode]int)

	for head != nil {
		_, ok := hashMap[head]
		if ok {
			return true
		} else {
			hashMap[head] = 1
		}
		head = head.Next
	}
	return false
}
