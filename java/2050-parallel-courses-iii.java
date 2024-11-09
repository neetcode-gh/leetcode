public class Solution {
    public int minimumTime(int n, int[][] relations, int[] time) {
        Map<Integer, List<Integer>> adj = new HashMap<>();
        for (int[] relation : relations) {
            int src = relation[0];
            int dst = relation[1];
            adj.putIfAbsent(src, new ArrayList<>());
            adj.get(src).add(dst);
        }

        Map<Integer, Integer> maxTime = new HashMap<>();

        for (int i = 1; i <= n; i++) {
            dfs(i, time, adj, maxTime);
        }

        return maxTime.values().stream().max(Integer::compareTo).get();
    }

    private int dfs(int src, int[] time, Map<Integer, List<Integer>> adj, Map<Integer, Integer> maxTime) {
        if (maxTime.containsKey(src)) {
            return maxTime.get(src);
        }

        int res = time[src - 1];
        for (int nei : adj.getOrDefault(src, new ArrayList<>())) {
            res = Math.max(res, time[src - 1] + dfs(nei, time, adj, maxTime));
        }
        maxTime.put(src, res);
        return res;
    }
}
