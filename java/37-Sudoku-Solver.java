//this problem is easier than it looks
//mix of search a 2d matrix and valid sudoku

class Solution {

    public void solveSudoku(char[][] board) {
        solve(board);
    }

    public boolean solve(char[][] board) {
        //traverse the complete sudoku and look for empty value
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                //look for '.' (empty block)
                if (board[i][j] == '.') {
                    //try filling all values
                    for (char c = '1'; c <= '9'; c++) {
                        //check if we can put that value at that place
                        //we will have a function for this which will check all the
                        //three conditions for a valid sudoku
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            //check whether the new board is solvable and just return true if it is
                            //so, we can just have only one sudoku combination.
                            //else backtrack, i.e., make it '.' again.
                            if (solve(board)) return true; else board[i][j] =
                                '.';
                        }
                    }
                    //if the board[i][j] is empty and we checked all values and
                    //nothing from '0' to '9' can be added then return false
                    //as this is unsolvable
                    return false;
                }
            }
        }
        return true;
    }

    public boolean isValid(char[][] board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            //row check
            if (board[row][i] == c) return false;
            //col check
            if (board[i][col] == c) return false;
            //boxes check
            //for this draw a sudoku and see by marking boxes and choosing a random postion
            //this is hard to explain but try this one
            //you'll get to the formula by yourself
            if (
                board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c
            ) return false;
        }
        return true;
    }
}
