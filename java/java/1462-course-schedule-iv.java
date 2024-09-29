class Solution {
    public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        HashMap<Integer, List<Integer>> hm = new HashMap<>();
        List<Boolean> res = new ArrayList<>();
        boolean[] visited = new boolean[numCourses];
        for (int i = 0; i < prerequisites.length; i++) {
            hm.putIfAbsent(prerequisites[i][1], new ArrayList<>());
            hm.get(prerequisites[i][1]).add(prerequisites[i][0]);
        }
        for (int i = 0; i < queries.length; i++) {
            visited = new boolean[numCourses];
            res.add(dfs(hm, queries[i][1], queries[i][0], visited));
        }
        return res;
    }

    boolean dfs(HashMap<Integer, List<Integer>> hm, int s, int target, boolean[] visited) {
            if (!hm.containsKey(s)) return false;
            if (hm.get(s).contains(target)) return true;

            for (int i: hm.get(s)) {
                if (visited[i]) continue;
                visited[i] = true;
                if (dfs(hm, i, target, visited)) return true;
            }
            return false;
    }
}
