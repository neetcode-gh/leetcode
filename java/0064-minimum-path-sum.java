class Solution {

    public int minPathSum(int[][] grid) {
        int m = grid.length - 1;
        int n = grid[0].length - 1;
        int[][] dp = new int[m + 1][n + 1];
        for (int[] arr : dp) {
            Arrays.fill(arr, -1);
        }
        return helper(grid, m, n, dp);
    }

    public int helper(int[][] grid, int m, int n, int[][] dp) {
        if (m == 0 && n == 0) return grid[0][0];
        if (m == 0) {
            dp[m][n] = grid[m][n] + helper(grid, m, n - 1, dp);
            return dp[m][n];
        }
        if (n == 0) {
            dp[m][n] = grid[m][n] + helper(grid, m - 1, n, dp);
            return dp[m][n];
        }
        if (dp[m][n] != -1) return dp[m][n];
        dp[m][n] =
            grid[m][n] +
            Math.min(helper(grid, m, n - 1, dp), helper(grid, m - 1, n, dp));
        return dp[m][n];
    }
}
