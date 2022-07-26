class Solution {
     func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode?, _ q: TreeNode?) -> TreeNode? {
        guard let root = root, let p = p, let q = q else { return nil }
        if root.val < p.val && root.val < q.val {
            return lowestCommonAncestor(root.right, p, q)
        } else if root.val > p.val && root.val > q.val {
            return lowestCommonAncestor(root.left, p, q)
        } else {
            return root
        }
        return nil
    }
}
