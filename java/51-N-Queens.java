class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> ans = new ArrayList<List<String>>();
        boolean[][] board = new boolean[n][n];
        queens(board, 0, ans);
        return ans;
        
    }
    
    public void queens(boolean[][] board, int row , List<List<String>> ans2) {
        //base case
        if (row == board.length) {
            ArrayList<String> ans = new ArrayList<String>();
            createAnswer(board, ans);
            ans2.add(ans);
            return;
        }
        for (int col = 0; col<board.length; col++) {
            if (isSafe(board,row, col)) {
                board[row][col] = true;
                queens(board, row+1, ans2);
                board[row][col] = false;
            }
        }
    }
    
    public void createAnswer(boolean[][] board, ArrayList<String> ans) {
        for (int i = 0; i<board.length; i++) {
            StringBuilder str = new StringBuilder();
            for (int j = 0; j<board[0].length; j++) {
                if (board[i][j]) {
                    str.append("Q");
                } else str.append(".");
            }
            ans.add(str.toString());
        }
    }
    
    public boolean isSafe(boolean[][] board, int row, int col) {
        for (int i = 0; i<row; i++) {
            if (board[i][col]) {
                return false;
            }
        }
        int maxLeft = Math.min(row,col);
        for (int i = 1; i<=maxLeft; i++) {
            if (board[row-i][col-i]) {
                return false;
            }
        }
        int maxRight = Math.min(row,board.length-1-col);
        for (int i = 1; i<=maxRight; i++) {
            if (board[row-i][col+i]) return false;
        }
        return true;
    }
}
