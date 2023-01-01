func mergeKLists(lists []*ListNode) *ListNode {
    if lists == nil || len(lists) == 0 {
        return nil
    }
    
    for len(lists) > 1 {
        var mergedLists []*ListNode
        for i := 0; i < len(lists); i += 2 {
            l1 := lists[i]
            var l2 *ListNode
            if (i + 1) < len(lists) {
                l2 = lists[i + 1]
            }
            mergedLists = append(mergedLists, mergeList(l1, l2))
        }
        lists = mergedLists
    }
    return lists[0]
}

func mergeList(l1, l2 *ListNode) *ListNode {
    dummy := &ListNode{}
    tail := dummy
    
    for l1 != nil && l2 != nil {
        if l1.Val < l2.Val {
            tail.Next = l1
            l1 = l1.Next
        } else {
            tail.Next = l2
            l2 = l2.Next
        }
        tail = tail.Next
    }
    if l1 != nil {
        tail.Next = l1
    }
    if l2 != nil {
        tail.Next = l2
    }
    return dummy.Next
}
