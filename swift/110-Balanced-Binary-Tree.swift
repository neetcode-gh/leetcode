/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func getMaxHeight(of root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return 1 + max(
            getMaxHeight(of: root.left),
            getMaxHeight(of: root.right)
        )
    }
    
    func isBalanced(_ root: TreeNode?) -> Bool {
        guard let root = root else { return true }
        
        let leftHeight  = getMaxHeight(of: root.left)
        let rightHeight = getMaxHeight(of: root.right)
        let difference  = abs(leftHeight - rightHeight)    
    
        // early exits
        guard difference <= 1 else { return false }
        guard isBalanced(root.left)  == true else { return false }
        guard isBalanced(root.right) == true else { return false }
        
        return true
    }
}
