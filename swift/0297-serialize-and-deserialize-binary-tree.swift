/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.left = nil
 *         self.right = nil
 *     }
 * }
 */

class Codec {

    func preorderTraversal(_ root: TreeNode?) -> String {
        guard let root = root else { return "x" }
        return "\(root.val)" + " " + preorderTraversal(root.left) + " " + preorderTraversal(root.right)
    }

    func serialize(_ root: TreeNode?) -> String {
        return preorderTraversal(root)
    }
    
    func preorderTraversal(_ data: [String], _ index: inout Int) -> TreeNode? {
        guard index < data.count else { return nil }
        guard data[index] != "x" else { return nil }
        guard let val = Int(data[index]) else { return nil }
        let current = TreeNode(val)
        index += 1
        current.left = preorderTraversal(data, &index)
        index += 1
        current.right = preorderTraversal(data, &index)
        return current
    }
    
    func deserialize(_ data: String) -> TreeNode? {
        guard !data.isEmpty else { return nil }
        var index = 0
        return preorderTraversal(data.split(separator: " ").map { String($0) }, &index)
    }
}

// Your Codec object will be instantiated and called as such:
// var ser = Codec()
// var deser = Codec()
// deser.deserialize(ser.serialize(root))