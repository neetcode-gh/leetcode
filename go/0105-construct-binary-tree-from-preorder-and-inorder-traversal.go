func buildTree(preorder []int, inorder []int) *TreeNode {
    if len(preorder) == 0 || len(inorder) == 0 {
        return nil
    }
    
    root := &TreeNode{Val: preorder[0]}
    mid := index(inorder, preorder[0])
    root.Left = buildTree(preorder[1: mid + 1], inorder[:mid])
    root.Right = buildTree(preorder[mid + 1:], inorder[mid + 1:])
    return root
}

func index(arr []int, val int) int {
    for i, v := range arr {
        if v == val {
            return i
        }
    }
    return -1
}
