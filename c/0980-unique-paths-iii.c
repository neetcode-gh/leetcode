const int OBSTACLE = -1, EMPTY = 0, START = 1, END = 2;
int uniquePathsIII(int** grid, int gridSize, int* gridColSize){
    int startRow, startCol, endRow, endCol,
        toVisit = 0, visited = 0, R = gridSize, C = gridColSize[0];
    for(int row = 0; row < R; row++)
        for(int col = 0; col < C; col++) {
            //dereference the value of the current cell
            int cell = grid[row][col];
            if(cell != OBSTACLE) {
                //all non obstacle cells must be visited
                toVisit++;
                //remember start and end cells
                if(cell == START) {
                    startRow = row;
                    startCol = col;
                } else if(cell == END) {
                    endRow = row;
                    endCol = col;
                }
            } else
                //obstacles can be considered visited cells
                visited |= 1 << (row*C + col);
        }
    
    //The starting state is an empty path which will visit the start cell next
    return solve(R, C, endRow, endCol, visited, toVisit, startRow, startCol);
}

int solve(int R, int C, int endRow, int endCol, int visited, int toVisit, int row, int col){
    toVisit--;
    //base case, we are at the end cell.
    if(row == endRow && col == endCol)
        return !toVisit;
    
    //add current cell to visited set
    visited |= 1 << (row*C + col);
    
    //count paths which go through all other valid neighbor cells.
    int ret = 0;
    if(row > 0 && !(visited & (1 << ((row - 1)*C + col))))
        ret += solve(R, C, endRow, endCol, visited, toVisit, row - 1, col);
    if(row + 1 < R && !(visited & (1 << ((row + 1)*C + col))))
        ret += solve(R, C, endRow, endCol, visited, toVisit, row + 1, col);
    if(col > 0 && !(visited & (1 << (row*C + col - 1))))
        ret += solve(R, C, endRow, endCol, visited, toVisit, row, col - 1);
    if(col + 1 < C && !(visited & (1 << (row*C + col + 1))))
        ret += solve(R, C, endRow, endCol, visited, toVisit, row, col + 1);
    return ret;
}
