/*
// Definition for a Node.
public class Node {
    public int val;
    public Node next;
    public Node random;
    
    public Node(int _val) {
        val = _val;
        next = null;
        random = null;
    }
}
*/

public class Solution {
    public Node CopyRandomList(Node head) {
        var map = new Dictionary<Node, Node>();
        if (head == null) return null;
        var copy = new Node(head.val);
        
        
        map[head] = copy;
        var cur1 = head.next;
        var cur2 = copy;
        
        // first pass to create the nodes
        while(cur1 != null) {
            var next2 = new Node(cur1.val);
            cur2.next = next2;
            //map the nodes
            map[cur1] = next2;
            cur1 = cur1.next;
            cur2 = cur2.next;
        }
        
        cur1 = head;
        cur2 = copy;
        
        // second pass to update the random pointers
        while(cur2 != null) {
            var random = cur1.random != null 
                ? map[cur1.random]
                : null;
            
            cur2.random = random;
            cur1 = cur1.next;
            cur2 = cur2.next;
                
                
        }
        return copy;
    }
}