/*
// Definition for a Node.
public class Node {
    public int val;
    public IList<Node> neighbors;

    public Node() {
        val = 0;
        neighbors = new List<Node>();
    }

    public Node(int _val) {
        val = _val;
        neighbors = new List<Node>();
    }

    public Node(int _val, List<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

public class Solution {
    
    Dictionary<Node, Node> map = new Dictionary<Node, Node>();
    
    public Node CloneGraph(Node node) {
        if (node == null) return null;
            if (!map.ContainsKey(node))
            {
                map.Add(node, new Node(node.val));
                foreach (var n in node.neighbors)
                {
                    map[node].neighbors.Add(CloneGraph(n));
                }
            }

            return map[node];
    }
}
