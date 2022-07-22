package mergeksortedlists

type ListNode struct {
	Val  int
	Next *ListNode
}

func mergeKLists(lists []*ListNode) *ListNode {
	if len(lists) == 0 {
		return nil
	}
	for len(lists) > 1 {
		mergedList := []*ListNode{}

		for i := 0; i < len(lists); i = i + 2 {
			var newList1 *ListNode
			var newList2 *ListNode
			newList1 = lists[i]
			if i+1 < len(lists) {
				newList2 = lists[i+1]
			}
			newMergedList := merge2sortedLists(newList1, newList2)
			mergedList = append(mergedList, newMergedList)
		}
		lists = make([]*ListNode, 0)
		lists = append(lists, mergedList...)
	}
	return lists[0]
}

func merge2sortedLists(list1 *ListNode, list2 *ListNode) *ListNode {
	if list1 == nil {
		return list2
	}
	if list2 == nil {
		return list1
	}
	dummy := &ListNode{
		Val: 0,
	}
	head := dummy
	for list1 != nil && list2 != nil {
		if list1.Val <= list2.Val {
			dummy.Next = list1
			list1 = list1.Next
		} else {
			dummy.Next = list2
			list2 = list2.Next
		}
		dummy = dummy.Next
	}
	if list1 != nil {
		dummy.Next = list1
	}
	if list2 != nil {
		dummy.Next = list2
	}
	return head.Next
}

// The solution in leetcode sol is much faster one. here we are not copying the array.
// Initially interval is 1(incrementer: 2) . Indexes that will be considered are [0,2,4] an pairs are (0,1)(2,3)(4,5)
// Basically we are storing the result of (lists[0],lists[1]) pair in lists[0] and (lists[2],lists[3]) pair in lists[2] and (lists[4],lists[5]) in lists[4]
// In the next iteration we get new pair since interval is multiplied by 2
// Interval is 2(Incrementer: 4) so the new indexes will be 0,4,8 and pairs are (0,2)(4,6)(8,10)
// New pair is (lists[0],lists[2]) and this will be stored in lists[0]
func mergeKListsFasterSolution(lists []*ListNode) *ListNode {
	if len(lists) == 0 {
		return nil
	}
	amount := len(lists)
	interval := 1
	for interval < amount {
		incrementer := interval * 2
		for i := 0; i < (amount - interval); i += incrementer {
			lists[i] = merge2sortedLists(lists[i], lists[i+interval])
		}
		interval *= 2
	}
	return lists[0]
}
