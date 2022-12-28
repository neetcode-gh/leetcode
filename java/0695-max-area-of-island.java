class Solution {

    public int maxAreaOfIsland(int[][] grid) {
        int ans = 0;
        int m = grid.length;
        int n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) ans =
                    Math.max(dfs(grid, i, j, m, n, new int[] { 0 }), ans);
            }
        }
        return ans;
    }

    public int dfs(int[][] grid, int i, int j, int m, int n, int[] count) {
        if (
            i < 0 || j < 0 || i >= m || j >= n || grid[i][j] == 0
        ) return count[0];
        count[0]++;
        grid[i][j] = 0;
        dfs(grid, i - 1, j, m, n, count);
        dfs(grid, i + 1, j, m, n, count);
        dfs(grid, i, j - 1, m, n, count);
        dfs(grid, i, j + 1, m, n, count);
        return count[0];
    }
}
