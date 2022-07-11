//Exactly similar to : 329. Longest Increasing Path in a Matrix

class Solution {
    long mod = (long)Math.pow(10,9)+7;
    public int countPaths(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        long[][] dp = new long[m][n];
        for (int i = 0; i<grid.length; i++) {
            for (int j = 0; j<grid[0].length; j++) {
                if (dp[i][j]==0) {
                    dfs(grid, dp, i, j, m, n, -1);
                }
            }
        }
        long sum = 0;
        for (long[] d: dp) {
            for (long i: d) {
                sum= (sum+i)%mod;
            }
        } 
        return (int)sum;
    }
    
    public long dfs(int[][] grid, long[][] dp, int i, int j, int m, int n, int prevValue) {
        if (i<0 || j<0 || i>=m || j>=n || prevValue>=grid[i][j]) 
            return 0;
        if (dp[i][j]!=0)
            return dp[i][j];
        prevValue = grid[i][j];
        long left = dfs(grid, dp, i, j-1, m, n, prevValue)%mod;
        long bottom = dfs(grid, dp, i+1, j, m, n, prevValue)%mod;
        long right = dfs(grid, dp, i, j+1, m, n, prevValue)%mod;
        long top = dfs(grid, dp, i-1, j, m, n, prevValue)%mod;
        dp[i][j] = (1+left+top+bottom+right)%mod;
        return dp[i][j];
    }
}
