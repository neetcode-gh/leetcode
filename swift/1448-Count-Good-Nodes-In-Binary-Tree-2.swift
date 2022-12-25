//
//  1448-Count-Good-Nodes-In-Binary-Tree.swift
//  Question Link: https://leetcode.com/problems/count-good-nodes-in-binary-tree/
//

class Solution {
    func goodNodes(_ root: TreeNode?) -> Int {
        guard let root = root else { return 0 }
        return helper(root, Int.min)
    }
    
    func helper(_ root: TreeNode?, _ lastVal: Int) -> Int {
        guard let root = root else { return 0 }
        let i = root.val >= lastVal ? 1 : 0
        let left = helper(root.left, max(lastVal, root.val))
        let right = helper(root.right, max(lastVal, root.val))
        return i + left + right
    }
}