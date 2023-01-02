class Solution {
    class RecursiveBiFunction<A, B, C> {
        BiFunction<A, B, C> func;
    }
    
    public int countSubIslands(final int[][] grid1, final int[][] grid2) {
        final int ROWS = grid1.length, COLS = grid1[0].length;
        final Set<Integer> visit = new HashSet<>();
        
        final RecursiveBiFunction<Integer, Integer, Boolean> dfs = new RecursiveBiFunction<>();
        dfs.func = (r, c) -> {
            int flatCoord = r*COLS + c;
            if(
                r < 0 
                || c < 0
                || r == ROWS
                || c == COLS
                || grid2[r][c] == 0
                || visit.contains(flatCoord)
            )
                return true;
            
            visit.add(flatCoord);
            boolean res = true;
            if(grid1[r][c] == 0)
                res = false;
            
            res = dfs.func.apply(r - 1, c) && res;
            res = dfs.func.apply(r + 1, c) && res;
            res = dfs.func.apply(r, c - 1) && res;
            res = dfs.func.apply(r, c + 1) && res;
            return res;
        };
        
        int count = 0;
        for(int r = 0; r < ROWS; r++)
            for(int c = 0; c < COLS; c++)
                if(grid2[r][c] != 0 && !visit.contains(r*COLS + c) && dfs.func.apply(r, c))
                    count += 1;
        return count;
    }
}
