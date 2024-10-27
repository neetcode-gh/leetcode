/**
 * Question Link: https://leetcode.com/problems/binary-tree-postorder-traversal/
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
    func postorderTraversal(_ root: TreeNode?) -> [Int] {
        var res = [Int]()
        var stack = [root]
        var visit = [false]
        while !stack.isEmpty {
            let cur = stack.removeLast()
            let visited = visit.removeLast()
            if cur != nil {
                if visited {
                    res.append(cur!.val)
                } else {
                    stack.append(cur)
                    visit.append(true)
                    stack.append(cur?.right)
                    visit.append(false)
                    stack.append(cur?.left)
                    visit.append(false)
                }
            }
        }
        return res
    }
}