/*
Return the maximum area of an island in grid. If there is no island, return 0.
Time: O(n^2)
Space: O(1)

*/

int max(int a, int b) {
    return a>b?a:b;
}

int dfs(int** grid, int n, int m, int i, int j) {
    int cpt=1;
    grid[i][j]=0;
    if (i>0 && grid[i-1][j]==1)
        cpt += dfs(grid, n, m, i-1, j);
    if (j>0 && grid[i][j-1]==1)
        cpt += dfs(grid, n, m, i, j-1);
    if (i<(n-1) && grid[i+1][j]==1)
        cpt += dfs(grid, n, m, i+1, j);
    if (j<(m-1) && grid[i][j+1]==1)
        cpt += dfs(grid, n, m, i, j+1);
    return cpt;
}

int maxAreaOfIsland(int** grid, int gridSize, int* gridColSize){
    int m = 0, h=*gridColSize, i, j;
    for (i=0; i<gridSize; i++) {
        for (j=0; j<h; j++) {
            if (grid[i][j]==1)
                m = max(m, dfs(grid, gridSize, h, i, j));
        }
    }
    return m;
}
