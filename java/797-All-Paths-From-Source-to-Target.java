class Solution {

    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> list = new ArrayList<>();
        list.add(0);
        dfs(ans, graph, list, 0);
        return ans;
    }

    public void dfs(
        List<List<Integer>> ans,
        int[][] graph,
        List<Integer> list,
        int i
    ) {
        if (i == graph.length - 1) {
            ans.add(new ArrayList<Integer>(list));
            return;
        }
        for (int val : graph[i]) {
            list.add(val);
            dfs(ans, graph, list, val);
            list.remove(list.size() - 1);
        }
    }
}
