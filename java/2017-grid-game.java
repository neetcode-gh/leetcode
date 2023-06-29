class Solution {
    public long gridGame(int[][] grid) {
        int n = grid[0].length;
        if (n <= 1) return 0;

        long topRight = 0;
        for (int i : grid[0]) topRight += i;

        long res = Long.MAX_VALUE;
        long preTop = 0;
        long bottom = 0;
        for (int i = 0; i < n; i++) {
            long top = topRight - (preTop += grid[0][i]);
            if (i > 0) bottom += grid[1][i - 1];
            res = Math.min(res, Math.max(top, bottom));
        }
        return res;
    }
}