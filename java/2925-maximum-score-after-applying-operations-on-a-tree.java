class Solution {
    List<List<Integer>> g; 
    public long maximumScoreAfterOperations(int[][] edges, int[] values) {
        g = new ArrayList<>();
        for (int i = 0; i < values.length; i++)
            g.add(new ArrayList<>());
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1];
            g.get(u).add(v);
            g.get(v).add(u);
        }    
        long totalSum = 0;
        for (int v : values)
            totalSum += v;

        long minScore = dfs(0, -1, values);

        return totalSum - minScore;
    }

    private long dfs(int node, int parent, int[] values) {
        long childSum = 0;

        for (int neighbour : g.get(node)) {
            if (neighbour == parent)
                continue;
            childSum += dfs(neighbour, node, values);   
        }
        if(childSum == 0)
            return values[node];
        long result = Math.min(values[node], childSum);
        return result;    
    }
}
