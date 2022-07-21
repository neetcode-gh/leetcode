class Solution {

  public HashMap<Integer, Node> map = new HashMap<>();

  public Node cloneGraph(Node node) {
    if (node == null) return null;
    if (map.containsKey(node.val)) return map.get(node.val);
    Node newNode = new Node(node.val, new ArrayList<Node>());
    map.put(node.val, newNode);
    for (Node neighbor : node.neighbors) {
      newNode.neighbors.add(cloneGraph(neighbor));
    }
    return newNode;
  }
}
