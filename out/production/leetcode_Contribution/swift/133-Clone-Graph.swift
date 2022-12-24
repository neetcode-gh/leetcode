/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var neighbors: [Node?]
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.neighbors = []
 *     }
 * }
 */

class Solution {
    var mapping: [Node?: Node?] = [:]
    
    func cloneGraph(_ node: Node?) -> Node? {
        guard let node = node else { return nil }
        // check if cache exists
        
        if mapping[node] != nil {
            return mapping[node]!
        }
        
        // otherwise, create a node, cache it, recurse for children
        let newNode = Node(node.val)
        mapping[node] = newNode
        
        node.neighbors.forEach { neighbor in
            newNode.neighbors.append(cloneGraph(neighbor))
        }
        return newNode
    }
}