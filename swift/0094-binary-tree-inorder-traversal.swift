class Solution {
    func inorderTraversal(_ root: TreeNode?) -> [Int] {
        var result: [Int] = []
        func rec(_ node: TreeNode?) {
            guard let node = node else { return }
            rec(node.left)
            result.append(node.val)
            rec(node.right)
        }

        rec(root)
        return result
    }
}