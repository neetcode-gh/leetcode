func rightSideView(root *TreeNode) []int {
    res := make([]int, 0)
    q := []*TreeNode{root}
    
    for len(q) != 0 {
        var rightSide *TreeNode
        qLen := len(q)
        
        for i := 0; i < qLen; i++ {
            node := q[0]
            q = q[1:]
            if node != nil {
                rightSide = node
                q = append(q, node.Left)
                q = append(q, node.Right)
            }
        }
        if rightSide != nil {
            res = append(res, rightSide.Val)
        }
    }
    return res
}
