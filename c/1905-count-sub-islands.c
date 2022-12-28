/*

Space: O(n²) (due to recursives calls)
Time: O(n²)
*/

bool dfs_test(int** grid1, int** grid2, int i, int j, int n, int m) {
    // Test if the island in grid2 is entirely in grid1 and delete the island in grid2
    bool ans = (grid1[i][j] == 1);
    grid2[i][j] = 0;
    if (i>0 && grid2[i-1][j]==1)
        ans = dfs_test(grid1, grid2, i-1, j, n ,m) && ans;
    if (j>0  && grid2[i][j-1]==1)
        ans = dfs_test(grid1, grid2, i, j-1, n ,m) && ans;
    if (i<(n-1)  && grid2[i+1][j]==1)
        ans = dfs_test(grid1, grid2, i+1, j, n ,m) && ans;
    if (j<(m-1)  && grid2[i][j+1]==1)
        ans = dfs_test(grid1, grid2, i, j+1, n ,m) && ans;
    return ans;
}

int countSubIslands(int** grid1, int grid1Size, int* grid1ColSize, int** grid2, int grid2Size, int* grid2ColSize){
    int cpt=0;
    for (int i=0; i<grid1Size; i++) {
        for (int j=0; j<grid1ColSize[i]; j++) {
            if (grid2[i][j]==1) {
                // Test if the island in grid2 is contained in an island in grid1
                if (dfs_test(grid1, grid2, i, j, grid1Size, grid1ColSize[i])){
                    cpt++;
                }
            }
        }
    }
    return cpt;
}
