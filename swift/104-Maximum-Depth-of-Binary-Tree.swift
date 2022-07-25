class Solution {
    func maxDepth(_ root: TreeNode?) -> Int {
        guard root != nil else { return 0 }
        return max(maxDepth(root?.left) + 1, maxDepth(root?.right) + 1)
    }
}
