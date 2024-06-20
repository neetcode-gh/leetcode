/**
 * https://leetcode.com/problems/search-in-a-binary-search-tree/
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
    func searchBST(_ root: TreeNode?, _ val: Int) -> TreeNode? {
        if root == nil {
            return nil
        }

        if val > root!.val {
            return searchBST(root?.right, val)
        } else if val < root!.val {
            return searchBST(root?.left, val)
        } else {
            return root
        }
    }
}