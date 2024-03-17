public class Solution {
    public List<Integer> findAllPeople(int n, int[][] meetings, int firstPerson) {
        Set<Integer> secrets = new HashSet<>(Arrays.asList(0, firstPerson)); 
        Map<Integer, Map<Integer, List<Integer>>> timeMap = new HashMap<>(); 

        for (int[] meeting : meetings) {
            int src = meeting[0], dst = meeting[1], time = meeting[2];
            timeMap.putIfAbsent(time, new HashMap<>());
            timeMap.get(time).putIfAbsent(src, new ArrayList<>());
            timeMap.get(time).putIfAbsent(dst, new ArrayList<>());
            timeMap.get(time).get(src).add(dst);
            timeMap.get(time).get(dst).add(src);
        }

        for (Integer time : new TreeSet<>(timeMap.keySet())) { 
            Set<Integer> visit = new HashSet<>();
            for (Integer src : timeMap.get(time).keySet()) {
                if (secrets.contains(src)) {
                    dfs(src, timeMap.get(time), visit, secrets);
                }
            }
        }

        return new ArrayList<>(secrets);
    }

    private void dfs(int src, Map<Integer, List<Integer>> adj, Set<Integer> visit, Set<Integer> secrets) {
        if (visit.contains(src)) {
            return;
        }
        visit.add(src);
        secrets.add(src);
        for (Integer nei : adj.get(src)) {
            dfs(nei, adj, visit, secrets);
        }
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        int n = 5;
        int[][] meetings = { { 0, 1, 2 }, { 1, 2, 3 }, { 2, 3, 4 }, { 4, 5, 5 } };
        int firstPerson = 1;
        List<Integer> result = solution.findAllPeople(n, meetings, firstPerson);
        System.out.println(result);
    }
}
