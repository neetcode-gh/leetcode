class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        List<Integer> res = new ArrayList<>();
        HashMap<Integer, Boolean> safe = new HashMap<>();
        for(int i = 0; i < graph.length; i++){
            if(dfs(graph, i, safe))
                res.add(i);
        }
        return res;
    }

    private boolean dfs(int[][] graph, int src, HashMap<Integer, Boolean> safe) {
        if (safe.containsKey(src))
            return safe.get(src);

        safe.put(src, false);

        for (int neighbour : graph[src]) {
            if (!dfs(graph, neighbour, safe))
                    return false;
        }
        safe.put(src, true);
        return true;
    }    
}
