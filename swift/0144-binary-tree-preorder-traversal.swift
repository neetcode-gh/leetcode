/**
 * Question Link: https://leetcode.com/problems/binary-tree-preorder-traversal/
 */

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
    func preorderTraversal(_ root: TreeNode?) -> [Int] {
        var stack = [TreeNode]()
        var cur = root
        var res = [Int]()
        while cur != nil || !stack.isEmpty {
            if cur != nil {
                res.append(cur!.val)
                if cur?.right != nil {
                    stack.append(cur!.right!)
                }
                cur = cur?.left
            } else {
                cur = stack.popLast()
            }
        }
        return res
    }
}