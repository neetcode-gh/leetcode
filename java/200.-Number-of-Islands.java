class Solution {
    public int numIslands(char[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        boolean[][] visitedNodes = new boolean[rows][cols];

        int result = 0;

        for(int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if(grid[i][j] == '1' && !visitedNodes[i][j]) {
                    result++;
                    dfs(grid, visitedNodes, i, j);
                }
            }
        }

        return result;
    }

    public void dfs(char[][] grid,  boolean[][] visitedNodes, int r, int c) {
        if(r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == '0' || visitedNodes[r][c])
            return;
        visitedNodes[r][c] = true;
        dfs(grid, visitedNodes, r + 1, c);
        dfs(grid, visitedNodes, r - 1, c);
        dfs(grid, visitedNodes, r, c + 1);
        dfs(grid, visitedNodes, r, c - 1);
    }
}
