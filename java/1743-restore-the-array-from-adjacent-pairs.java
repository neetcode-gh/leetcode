class Solution {
    public static int[] restoreArray(int[][] adjacentPairs) {
        Map<Integer, List<Integer>> g = new HashMap<>();
        for(int[] p: adjacentPairs){
            int a = p[0], b = p[1];
            g.computeIfAbsent(a,val -> new ArrayList<>()).add(b);
            g.computeIfAbsent(b,val -> new ArrayList<>()).add(a);
        }
        int source = 0;
        for(int node: g.keySet()){
            if(g.get(node).size() == 1){
                source = node;
                break;
            }
        }
        int[] res = new int[adjacentPairs.length+1];
        Set<Integer> visited = new HashSet<>();
        dfs(g, source, res, visited, 0);
        return res;
    }
    private static void dfs(Map<Integer, List<Integer>> g, int node, int[] res, Set<Integer> visited, int i){
        res[i++] = node;
        visited.add(node);
        
        for(int ne: g.get(node)){
            if(!visited.contains(ne))
                dfs(g, ne, res, visited, i);
        }
    }
}
