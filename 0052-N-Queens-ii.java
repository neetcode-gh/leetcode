class Solution {
    public int totalNQueens(int n) {
        char[][] board = new char[n][n];
        for(int i=0;i<n;i++) {
            Arrays.fill(board[i], '.');
        }

        HashSet<Integer> posDiag = new HashSet<>(); // r + c
        HashSet<Integer> negDiag = new HashSet<>(); // r - c
        HashSet<Integer> cols = new HashSet<>(); // c

        return placeNQueens(0, 0, board, posDiag, negDiag, cols);
    }
    
    public int placeNQueens(int r, int c, char[][] board, HashSet<Integer> posDiag, HashSet<Integer> negDiag, HashSet<Integer> cols) {
        if(r == board.length) {
            // base case : we place all our N queens
            return 1;
        }

        if(c == board.length) {
            return 0;
        }

        int count = 0;

        if(!posDiag.contains(r+c) && !negDiag.contains(r-c) && !cols.contains(c)) {
            posDiag.add(r+c);
            negDiag.add(r-c);
            cols.add(c);

            board[r][c] = 'Q';
            count += placeNQueens(r+1, 0, board, posDiag, negDiag, cols);
            board[r][c] = '.';

            posDiag.remove(r+c);
            negDiag.remove(r-c);
            cols.remove(c);
        }
           
        count += placeNQueens(r, c+1, board, posDiag, negDiag, cols);

        return count;
    }
}

https://leetcode.com/problems/n-queens-ii/submissions/937300909/
