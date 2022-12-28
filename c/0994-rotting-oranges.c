
int directions[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

bool rotting_process(int** grid, int rows, int cols, int timestamp) {
    bool continue_process = false;
    for (int row = 0; row < rows; row++) {
        for (int col = 0; col < cols; col++) {
            if (grid[row][col] == timestamp) {
                for (int i = 0; i < 4; i++) {
                    int r = row + directions[i][0];
                    int c = col + directions[i][1];
                    if (rows > r && r >= 0 && cols > c && c >= 0) {
                        if (grid[r][c] == 1) {
                            grid[r][c] = timestamp + 1;
                            continue_process = true;
                        }
                    }
                }
            }
        }
    }
    return continue_process;
}

int orangesRotting(int** grid, int gridSize, int* gridColSize){
    
    int rows = gridSize;
    int cols = gridColSize[0];
    
    int timestamp = 2;
    while (rotting_process(grid, rows, cols, timestamp)) {
        timestamp += 1;
    } 
    
    for (int row = 0; row < rows; row++) {
        for (int col = 0; col < cols; col++) {
            if (grid[row][col] == 1) {
                return -1;
            }
        }
    }
    return timestamp - 2;
}