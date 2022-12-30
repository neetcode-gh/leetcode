class Solution {
    static final int ROW = 0, COL = 1;
    public List<List<Integer>> shiftGrid(int[][] grid, int k) {
        final int M = grid.length, N = grid[0].length;
        
        BiFunction<Integer, Integer, Integer> posToVal = (r, c) ->
            r * N + c;
        Function<Integer, int[]> valToPos = (v) ->
            new int[] {v / N, v % N};
        
        List<List<Integer>> res = new ArrayList<>();
        for(int i = 0; i < M; i++) {
            Integer[] tmp = new Integer[N];
            for(int j = 0; j < N; j++)
                tmp[j] = 0;
            res.add(Arrays.asList(tmp));
        }
        for(int r = 0; r < M; r++)
            for(int c = 0; c < N; c++) {
                int newVal = (posToVal.apply(r, c) + k) % (M * N);
                int[] newRC = valToPos.apply(newVal);
                res.get(newRC[ROW]).set(newRC[COL], grid[r][c]);
            }
        return res;
    }
}
