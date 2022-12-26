/*
Given an m x n grid of characters board and a string word, return true if word exists in the grid.
Time: O(n*m*(3^h)) where h is the length of the word
Space: O(1)

*/

bool dfs(char** board, int n, int m, int i, int j, char* word) {
    if (word[0]=='\0' || word[1]=='\0')
        return true;
    char c = board[i][j];
    board[i][j] = 0;
    if (i>0 && board[i-1][j]==word[1]){
        if (dfs(board, n, m, i-1, j, word+1)){
            board[i][j] = c;
            return true;
        }
    }
    if (j>0  && board[i][j-1]==word[1]){
        if (dfs(board, n, m, i, j-1, word+1)){
            board[i][j] = c;
            return true;
        }
    }
    if (i<(n-1) && board[i+1][j]==word[1]){
        if (dfs(board, n, m, i+1, j, word+1)){
            board[i][j] = c;
            return true;
        }
    }
    if (j<(m-1) && board[i][j+1]==word[1]){
        if (dfs(board, n, m, i, j+1, word+1)){
            board[i][j] = c;
            return true;
        }
    }
    board[i][j] = c;
    return false;
}


bool exist(char** board, int boardSize, int* boardColSize, char * word){
    int m = (*boardColSize), i, j;
    for (i=0; i<boardSize; i++) {
        for (j=0; j<m; j++) {
            if (board[i][j]==word[0]) {
                if (dfs(board, boardSize, m, i, j, word)){
                    return true;
                }
            }
        }
    }
    return false;
}
