class Solution {
    Map<String, Integer> cache;

    public int minDifficulty(int[] jobDifficulty, int d) {
        if(d > jobDifficulty.length)
            return -1;
        cache = new HashMap<>();
        return dfs(0, d, -1, jobDifficulty);        
    }
  
    private int dfs(int i, int d, int cur_max, int[] jobDiff){
        if(i == jobDiff.length)
            return (d == 0)? 0: (int)1e9;
        if(d == 0)
            return (int)1e9;
        String cur_state = i + "," + d + "," + cur_max;
        if(cache.containsKey(cur_state))
            return cache.get(cur_state);
        
        cur_max = Math.max(cur_max, jobDiff[i]);
        int res = Math.min(
                dfs(i + 1, d, cur_max, jobDiff),
                cur_max + dfs(i + 1, d - 1, -1, jobDiff)
        );
        cache.put(cur_state, res);
        return res;            
    }
}
