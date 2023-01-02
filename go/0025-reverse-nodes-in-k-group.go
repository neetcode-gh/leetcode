func reverseKGroup(head *ListNode, k int) *ListNode {
    dummy := &ListNode{Val: 0, Next: head}
    groupPrev := dummy
    
    for true {
        kth := getKth(groupPrev, k)
        if kth == nil {
            break;
        }
        groupNext := kth.Next
        
        // reverse group
        prev, curr := kth.Next, groupPrev.Next
        for curr != groupNext {
            tmp := curr.Next
            curr.Next = prev
            prev = curr
            curr = tmp
        }
        
        tmp := groupPrev.Next
        groupPrev.Next = kth
        groupPrev = tmp
    }
    return dummy.Next
}

func getKth(curr *ListNode, k int) *ListNode {
    for curr != nil && k > 0 {
        curr = curr.Next
        k -= 1
    }
    return curr
}
