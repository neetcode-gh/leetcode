class Solution {
    int Rows, Cols;
    int MOD = (int) 1e9 + 7;
    public int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        Rows = m;
        Cols = n;
        Map<String, Integer> cache = new HashMap<>();
        return dfs(startRow, startColumn, maxMove, cache);
    }
    private int dfs(int r, int c, int moves, Map<String, Integer> cache){
        if(r < 0 || r >= Rows || c < 0 || c >= Cols)
            return 1;
        if(moves == 0)
            return 0;
        String pos = r + "," + c + "," + moves;
        if(cache.containsKey(pos))
            return cache.get(pos);

        int res = ((dfs(r-1, c, moves-1, cache) + dfs(r+1, c, moves-1, cache))%MOD + (dfs(r, c-1, moves-1, cache) + dfs(r, c+1, moves-1, cache))%MOD)%MOD;
        cache.put(pos, res);
        return res;            
    }
}
