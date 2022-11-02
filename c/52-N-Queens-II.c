/*
Given an integer n, return the number of distinct solutions to the n-queens puzzle.

Space: O(n²)
Time: ?
*/

int min(int a, int b){
    return a<b?a:b;
}

int can_ce_placed(int i, int j, int n, int** board) {
    for (int k=i-1; k>=0; k--)
        if (board[k][j])
            return false;
    for (int k=j-1; k>=0; k--)
        if (board[i][k])
            return false;
    int m = min(i, j)+1;
    for (int k=1; k<m; k++)
        if (board[i-k][j-k])
            return false;
    m = min(i+1, n-j);
    for (int k=1; k<m; k++)
        if (board[i-k][j+k])
            return false;
    return true;
}

int backtracking(int i, int n, int** board) {
    if (i==n)
        return 1;
    int cpt = 0;
    for (int k=0; k<n; k++){
        if (can_ce_placed(i, k, n, board)){
            board[i][k] = 1;
            cpt += backtracking(i+1, n, board);
            board[i][k] = 0;
        }
    }
    return cpt;
}

int totalNQueens(int n){
    int** board = malloc(sizeof(int*)*n);
    for (int i=0; i<n; i++)
        board[i] = calloc(n, sizeof(int));
    int ans = backtracking(0, n, board);
    for (int i=0; i<n; i++)
        free(board[i]);
    free(board);
    return ans;
}
