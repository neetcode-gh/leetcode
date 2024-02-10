/**
 * Question Link: https://leetcode.com/problems/delete-node-in-a-bst/
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
    func deleteNode(_ root: TreeNode?, _ key: Int) -> TreeNode? {
        if root == nil {
            return root
        }

        if root!.val > key {
            root?.left = deleteNode(root?.left, key)
        } else if root!.val < key {
            root?.right = deleteNode(root?.right, key)
        } else {
            if root?.left == nil {
                return root?.right
            } else if root?.right == nil {
                return root?.left
            } else {
                let minNode = minNode(root: root?.right)
                root?.val = minNode!.val
                root?.right = deleteNode(root?.right, minNode!.val)
            }
        }
        return root
    }

    func minNode(root: TreeNode?) -> TreeNode? {
        var cur = root
        while cur != nil && cur?.left != nil {
            cur = cur?.left
        }
        return cur
    }
}