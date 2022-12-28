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
    var globalCount: Int = 1
    var globalAnswer: Int = -1
    var limit: Int = 0
    
    // Guaranteed k <= #Nodes
    func kthSmallest(_ root: TreeNode?, _ k: Int) -> Int {
        limit = k
        inorderTraversal(from: root)
        return globalAnswer
    }
    
    private func inorderTraversal(from node: TreeNode?) {
        // Base case
        guard let node = node else { return }
    
        // Recurse on left child
        inorderTraversal(from: node.left)
        
        // "visit" it
        if globalCount == limit {
            globalAnswer = node.val
        }
        globalCount += 1
        
        // Recurse on right child
        inorderTraversal(from: node.right)
    }
}
