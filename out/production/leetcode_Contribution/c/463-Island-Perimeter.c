/*
Determine the perimeter of the island.

Space: O(1)
Time: O(n²)
*/


int islandPerimeter(int** grid, int gridSize, int* gridColSize){
    int stripes = 0;
    for (int i=0; i<gridSize; i++) {
        for (int j=0; j<gridColSize[i]; j++) {
            if (grid[i][j]==1) {
                stripes += 4;
                if (i>0 && grid[i-1][j]==1)  // Common stripe at the top
                    stripes -= 2;
                if (j>0 && grid[i][j-1]==1) // Common stripe on the left
                    stripes -= 2;
            }
        }
    }
    return stripes;
}
