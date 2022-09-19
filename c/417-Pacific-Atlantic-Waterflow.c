

/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */

int directions[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
bool pacific_reach[200][200];
bool atlantic_reach[200][200];

void resetSet(bool set[200][200]) {
    for (int i = 0; i < 200; i++) {
        for (int j = 0; j < 200; j++) {
            set[i][j] = false;
        }
    }
}

void dfs(int row, int col, bool set[200][200], int** heights, int rows, int cols) {
    set[row][col] = true;
    int a = 0;
    int b = 0;
    for (int i = 0; i < 4; i++) {
        a = directions[i][0] + row;
        b = directions[i][1] + col;
        if ((a >= 0) && (a < rows) && (b >= 0) && (b < cols) && (!set[a][b])) {
            if (heights[a][b] >= heights[row][col]) {
                dfs(a, b, set, heights, rows, cols);
            }
        }
    }
}

int** pacificAtlantic(int** heights, int heightsSize, int* heightsColSize, int* returnSize, int** returnColumnSizes) {
    
    int rows = heightsSize;
    int cols = heightsColSize[0];
    
    resetSet(pacific_reach);
    resetSet(atlantic_reach);
    
    for (int row = 0; row < rows; row++) {
        dfs(row, 0, pacific_reach, heights, rows, cols);
        dfs(row, cols - 1, atlantic_reach, heights, rows, cols);
    }
    for (int col = 0; col < cols; col++) {
        dfs(0, col, pacific_reach, heights, rows, cols);
        dfs(rows - 1, col, atlantic_reach, heights, rows, cols);
    }
    
    int res = 0;
    for (int row = 0; row < rows; row++) {
        for (int col = 0; col < cols; col++) {
            if ((pacific_reach[row][col] == true) && (atlantic_reach[row][col] == true)) {
                res += 1;
            }
        }
    }
    
    *returnSize = res;
    returnColumnSizes[0] = (int*)malloc(res * sizeof(int));
    for (int i = 0; i < res; i++) {
        returnColumnSizes[0][i] = 2;
    }
    
    int** results = (int**)malloc(res * sizeof(int*));
    res = 0;
    for (int row = 0; row < rows; row++) {
        for (int col = 0; col < cols; col++) {
            if ((pacific_reach[row][col] == true) && (atlantic_reach[row][col] == true)) {
                int* buffer = (int*)malloc(2 * sizeof(int));
                buffer[0] = row;
                buffer[1] = col;
                results[res] = buffer;
                res += 1;
            }
        }
    }
    
    return results;
}