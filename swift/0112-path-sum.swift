class Solution {
    func hasPathSum(_ root: TreeNode?, _ targetSum: Int) -> Bool {
        guard let root = root else { return false }
        
        if root.val == targetSum && !hasChild(root) { return true }

        return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
    }

    func hasChild(_ root: TreeNode) -> Bool {
        return (root.left != nil) || (root.right != nil)
    }
}