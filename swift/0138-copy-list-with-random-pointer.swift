/**
 * Definition for a Node.
 * public class Node {
 *     public var val: Int
 *     public var next: Node?
 *     public var random: Node?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.next = nil
 *    	   self.random = nil
 *     }
 * }
 */

class Solution {
    // Cache of mapping from old to new nodes
    private var mapping: [Node?: Node?] = [:]
    
    func copyRandomList(_ head: Node?) -> Node? {
        // Base case: Nil node
        guard let node = head else { return nil }
        
        // Mapping exists
        guard mapping[node] == nil else { return mapping[node]! }
        
        // Create new node
        let newNode = Node(node.val)
        
        // Add to cache (i.e. 'visit' this node)
        mapping[node] = newNode
        
        // Recursive calls (preorder -> children calls)
        newNode.next = copyRandomList(node.next)
        newNode.random = copyRandomList(node.random)
        
        return newNode
    }
}
