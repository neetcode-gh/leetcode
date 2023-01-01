class Solution {
    public boolean checkMove(char[][] board, int rMove, int cMove, char color) {
        int[][] direction = {{1, 0}, {-1, 0}, {0, 1}, {0, -1},
                             {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};
        board[rMove][cMove] = color;
        
        for(int[] d: direction)
            if(legal(board, rMove, cMove, color, d)) return true;
        return false;
    }
    
    boolean legal(char[][] board, int row, int col, char color, int[] direc) {
        int ROWS = board.length, COLS = board[0].length;
        int dr = direc[0], dc = direc[1];
        row = row + dr;
        col = col + dc;
        int length = 1;
        
        while(0 <= row && row < ROWS && 0 <= col && col < COLS) {
            length += 1;
            if(board[row][col] == '.') return false;
            if(board[row][col] == color)
                return length >= 3;
            row = row + dr;
            col = col + dc;
        }
        return false;
    }
}
