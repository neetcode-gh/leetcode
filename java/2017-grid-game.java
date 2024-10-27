class Solution {
    public long gridGame(int[][] grid) {
        long[] prefix_top = new long[grid[0].length];
        long[] prefix_bottom = new long[grid[0].length];
        for(int i = 0; i < grid[0].length; i++)
        {
            prefix_top[i] = grid[0][i];
            prefix_bottom[i] = grid[1][i];
        }
        for(int i = 1; i < grid[0].length; i++)
        {
            prefix_top[i] += prefix_top[i - 1];
            prefix_bottom[i] += prefix_bottom[i - 1];
        }
        long res = Long.MAX_VALUE;
        long maxi = Long.MIN_VALUE;
        for(int i = 0; i < grid[0].length; i++)
        {
            long top = prefix_top[grid[0].length - 1] - prefix_top[i];
            long bottom = 0;
            if(i > 0)
            {
                bottom = prefix_bottom[i - 1];
            }
            maxi = Math.max(top, bottom);
            res = Math.min(res, maxi);
        }
        return res;
    }
}
