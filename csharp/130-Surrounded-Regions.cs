public class Solution {
    public void Solve(char[][] board) {
        var n = board.Length;

        if (n == 0) return;
        var m = board[0].Length;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if ((i == 0 || j == 0 || i == n - 1 || j == m - 1) && board[i][j] == 'O') {
                    CaptureDfs(board, i, j);
                }
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                }
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (board[i][j] == 'T') {
                    board[i][j] = 'O';
                }
            }
        }
    }

    private void CaptureDfs(char[][] board, int x, int y) {
        var n = board.Length;
        var m = board[0].Length;

        if (x >= n || x < 0 || y >= m || y < 0) {
            return;
        }

        if (board[x][y] == 'T' || board[x][y] == 'X') return;

        board[x][y] = 'T';
        CaptureDfs(board, x+1, y); 
        CaptureDfs(board, x-1, y); 
        CaptureDfs(board, x, y+1); 
        CaptureDfs(board, x, y-1); 

    }
}
