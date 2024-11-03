/*--------------------------
  Time Complexity: O(n)
  Space Complexity: O(n)
---------------------------*/  
class Solution {
    public int amountOfTime(TreeNode root, int start) {
        Map<Integer, List<Integer>> g = treeTograph(root);
        int time = 0;
        Queue<Integer> q = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();
        q.add(start);
        visited.add(start);

        while(!q.isEmpty()){
            int size = q.size(); 
            for (int i = 0; i < size; i++) {
                int curr = q.poll();
                for (int neighbour : g.get(curr)) {
                    if (!visited.contains(neighbour)) {
                        q.add(neighbour);
                        visited.add(neighbour);
                    }
                }
            }
            time++;
        }
        return time-1;
    }
    public HashMap<Integer, List<Integer>> treeTograph(TreeNode root) {
        HashMap<Integer, List<Integer>> graph = new HashMap<>();
        buildGraph(root, graph);
        return graph;
    }

    private void buildGraph(TreeNode node, HashMap<Integer, List<Integer>> graph) {
        if (node == null) {
            return;
        }

        graph.putIfAbsent(node.val, new ArrayList<>());

        if (node.left != null) {
            graph.get(node.val).add(node.left.val);
            graph.putIfAbsent(node.left.val, new ArrayList<>());
            graph.get(node.left.val).add(node.val);
            buildGraph(node.left, graph);
        }

        if (node.right != null) {
            graph.get(node.val).add(node.right.val);
            graph.putIfAbsent(node.right.val, new ArrayList<>());
            graph.get(node.right.val).add(node.val);
            buildGraph(node.right, graph);
        }
    }
}
