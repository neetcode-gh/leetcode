bool isValidSudoku(char** board, int boardSize, int* boardColSize){
    const int cnt = boardSize;
    bool row[cnt][cnt];
    bool col[cnt][cnt];
    bool sub[cnt][cnt];
    
    // initialize all the rows, cols, and sub-boxes to false
    for (int r = 0; r < cnt; r++) {
        for (int c = 0; c < cnt; c++) {
            row[r][c] = false;
            col[r][c] = false;
            sub[r][c] = false;
        }
    }
    
    for (int r = 0; r < cnt; r++) {
        for (int c = 0; c < cnt; c++) {
            // pass if not a number
            if (board[r][c] == '.') {
                continue;
            }
            
            // gets numerical index
            int boardIndex = board[r][c] - '0' - 1;
            int area = (r / 3) * 3 + (c / 3);
            
            // if number exists
            if (row[r][boardIndex] || col[c][boardIndex] || sub[area][boardIndex]) {
                return false;
            }
            
            row[r][boardIndex] = true;
            col[c][boardIndex] = true;
            sub[area][boardIndex] = true;
        }
    }
    return true;
}