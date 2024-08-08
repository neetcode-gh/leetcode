class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, List<Pair<String, Double>>> adj = new HashMap<>();
        for (int i = 0; i < equations.size(); i++) {
            List<String> equation = equations.get(i);
            adj.computeIfAbsent(
                    equation.get(0), k -> new ArrayList<>()).add(
                            new Pair<>(equation.get(1), values[i]));
            adj.computeIfAbsent(
                    equation.get(1), k -> new ArrayList<>()).add(
                            new Pair<>(equation.get(0), 1 / values[i]));
        }
        double[] res = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            List<String> query = queries.get(i);
            res[i] = bfs(adj, query.get(0), query.get(1));
        }
        return res;
    }

    private double bfs(Map<String, List<Pair<String, Double>>> adj, String src, String target) {
        if (!adj.containsKey(src) || !adj.containsKey(target)) {
            return -1.0;
        }
        ArrayDeque<Pair<String, Double>> queue = new ArrayDeque<>();
        Set<String> visited = new HashSet<>();
        queue.addLast(new Pair<>(src, 1.0));
        visited.add(src);
        while (!queue.isEmpty()) {
            Pair<String, Double> item = queue.pollFirst();
            String node = item.getKey();
            Double curWeight = item.getValue();
            if (node.equals(target)) {
                return curWeight;
            }
            for (Pair<String, Double> neighbor : adj.get(node)) {
                String nextNode = neighbor.getKey();
                Double weight = neighbor.getValue();
                if (!visited.contains(nextNode)) {
                    queue.addLast(new Pair<>(nextNode, curWeight * weight));
                    visited.add(nextNode);
                }
            }
        }
        return -1.0;
    }
}
