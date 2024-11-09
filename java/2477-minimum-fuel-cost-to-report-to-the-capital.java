class Solution {
    long res = 0;
    HashMap<Integer, List<Integer>> g = new HashMap<>();
    public long minimumFuelCost(int[][] roads, int seats) {
        for(int[] e : roads){
            int a = e[0], b = e[1];
            g.computeIfAbsent(a, val -> new ArrayList<>()).add(b);
            g.computeIfAbsent(b, val -> new ArrayList<>()).add(a);
        }
        if (g.size() == 0)
            return 0;

        dfs(0, -1, seats);
        return res;
    }
    
    private int dfs(int node, int parent, int seats){
        int passengers = 0;
        
        for(int child : g.get(node)){
            if(child != parent){
                int p = dfs(child, node, seats);
                passengers += p;
                res += (int) Math.ceil((double)p/seats);
            }
        }
        return passengers + 1;
    }
}
