/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
 func goodNodes(root *TreeNode) int {
    return goodNodesUtil(root, root.Val)
}

func goodNodesUtil(root *TreeNode, parent int) int {
    if root == nil {
        return 0
    }
    
    res := 1
    max := root.Val
    
    if parent > root.Val {
        res = 0
        max = parent
    }
    
    res += goodNodesUtil(root.Left, max)
    res += goodNodesUtil(root.Right, max)
    
    return res
}