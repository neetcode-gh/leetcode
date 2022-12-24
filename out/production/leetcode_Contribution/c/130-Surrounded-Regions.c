/*
Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.
Time: O(n^2)
Space: O(1)
*/


void dfsModifyBorder(char** board, int n, int m, int i, int j) {
    if (board[i][j]=='X')
        return;
    board[i][j]='T';
    if (i>0 && board[i-1][j]=='O')
        dfsModifyBorder(board, n, m, i-1, j);
    if (j>0 && board[i][j-1]=='O')
        dfsModifyBorder(board, n, m, i, j-1);
    if (i<(n-1) && board[i+1][j]=='O')
        dfsModifyBorder(board, n, m, i+1, j);
    if (j<(m-1) && board[i][j+1]=='O')
        dfsModifyBorder(board, n, m, i, j+1);
}

void reModifyBorder(char** board, int n, int m) {
    int i, j;
    for (i=0; i<n; i++){
        for (j=0; j<m; j++){
            if (board[i][j]=='O')
                board[i][j]='X';
            else if (board[i][j]=='T')
                board[i][j]='O';
        }
    }
}
                
void solve(char** board, int boardSize, int* boardColSize){
    int i, j;
    int m = (*boardColSize);
    int n1 = boardSize-1;
    int m1 = m-1;
    for (i=1; i<n1; i++) {
        dfsModifyBorder(board, boardSize, m, i, 0);
        dfsModifyBorder(board, boardSize, m, i, m1);
    }
    for (j=0; j<m; j++) {
        dfsModifyBorder(board, boardSize, m, 0, j);
        dfsModifyBorder(board, boardSize, m, n1, j);
    }
    reModifyBorder(board, boardSize, m);
}
