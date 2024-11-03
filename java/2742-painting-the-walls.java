class Solution {
    Map<String, Integer> dp;
    public int paintWalls(int[] cost, int[] time) {
        int n = cost.length;
        dp = new HashMap<>();
        return dfs(0, cost.length, cost, time);
    }
    private int dfs(int i, int remain, int[] cost, int[] time){
        if(remain <= 0)
            return 0;
        if(i == cost.length)
            return (int) 1e9;
        String s = i + "," + remain;
        if(dp.containsKey(s))
            return dp.get(s);

        int paint = cost[i] + dfs(i+1, remain-1-time[i], cost, time);
        int skip = dfs(i+1, remain, cost, time);
        dp.put(s, Math.min(paint, skip));
        return dp.get(s);           
    }
}
