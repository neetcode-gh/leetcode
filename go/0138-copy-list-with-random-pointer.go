func copyRandomList(head *Node) *Node {
    oldToCopy := make(map[*Node]*Node)
    
    cur := head
    for cur != nil {
        clone := &Node{Val: cur.Val}
        oldToCopy[cur] = clone
        cur = cur.Next
    }
    cur = head
    for cur != nil {
        clone := oldToCopy[cur]
        clone.Next = oldToCopy[cur.Next]
        clone.Random = oldToCopy[cur.Random]
        cur = cur.Next
    }
    return oldToCopy[head]
}
