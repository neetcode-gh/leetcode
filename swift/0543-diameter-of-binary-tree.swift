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
    private var globalMaxDiameter: Int = 0
    
    // Additionally, update the globalDiameter here
    func getMaxDepth(_ node: TreeNode?) -> Int {
        guard let node = node else { return 0 }
        
        // compute for each child
        let leftMax = getMaxDepth(node.left)
        let rightMax = getMaxDepth(node.right)
        
        // update diameter
        let diameter = leftMax + rightMax
        self.globalMaxDiameter = max(self.globalMaxDiameter, diameter)
        
        // return max depth of 'this' node
        return 1 + max(leftMax, rightMax)        
    }
    
    func diameterOfBinaryTree(_ root: TreeNode?) -> Int {
        self.globalMaxDiameter = 0
        getMaxDepth(root)
        return self.globalMaxDiameter
    }
}
