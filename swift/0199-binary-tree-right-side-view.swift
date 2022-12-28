//
//  199-Binary-Tree-Right-Side-View.swift
//  Question Link: https://leetcode.com/problems/binary-tree-right-side-view/
//

class Solution {
    func rightSideView(_ root: TreeNode?) -> [Int] {
        guard let root = root else { return [] }
        var result = [Int]()
        var queue: [TreeNode] = [root]
        
        while !queue.isEmpty {
            var temp = [Int]()
            for node in queue {
                let node = queue.removeFirst()
                if let leftNode = node.left, leftNode != nil { queue.append(leftNode) }
                if let rightNode = node.right, rightNode != nil { queue.append(rightNode) }
                temp.append(node.val)
            }
            result.append(temp.last!)
        }
        return result
    }
}
