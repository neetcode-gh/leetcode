

int directions[][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

void searchIsland(int row, int col, int rows, int cols, char** grid) {
    if ( row >= 0 && col >= 0 && row < rows && col < cols && grid[row][col] == '1') {
        for (int i = 0; i < 4; i++) {
            searchIsland(row + directions[i][0], col + directions[i][1], rows, cols, grid);
            grid[row][col] = '0';
        }
    }
}


int numIslands(char** grid, int gridSize, int* gridColSize){
   
    int rows = gridSize;
    int cols = gridColSize[0];

    int IslandCount = 0;

    for (int row = 0; row < rows; row++) {
        for (int col = 0; col < cols; col++) {
            if (grid[row][col] == '1') {
                searchIsland(row, col, rows, cols, grid);
                IslandCount++;
            }
        }
    }
    return IslandCount;
}


 

// int numIslands(char** grid, int gridSize, int* gridColSize){
//     printf("%c", grid[0][4]);
//     return 0;
// }