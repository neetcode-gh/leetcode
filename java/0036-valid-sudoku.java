class Solution {

    public boolean isValidSudoku(char[][] board) {
        //neetcode solution, slightly modified

        //a set of the characters that we have already come across (excluding '.' which denotes an empty space)
        Set<Character> rowSet = null;
        Set<Character> colSet = null;


        for (int i = 0; i < 9; i++) {
            //reinitialize the sets so we don't carry over found characters from the previous run
            rowSet = new HashSet<>();
            colSet = new HashSet<>();
            for (int j = 0; j < 9; j++) {
                char r = board[i][j];
                char c = board[j][i];
                if (r != '.'){
                    if (rowSet.contains(r)){
                        return false;
                    } else {
                        rowSet.add(r);
                    }
                }
                if (c != '.'){
                    if (colSet.contains(c)){
                        return false;
                    } else {
                        colSet.add(c);
                    }
                }
            }
        }

        //block
        //loop controls advance by 3 each time to jump through the boxes
        for (int i = 0; i < 9; i = i + 3) {
            for (int j = 0; j < 9; j = j + 3) {
                //checkBlock will return true if valid
                if (!checkBlock(i, j, board)) {
                    return false;
                }
            }
        }
        //passed all tests, therefore valid board
        return true;
    }

    public boolean checkBlock(int idxI, int idxJ, char[][] board) {
        Set<Character> blockSet = new HashSet<>();
        //if idxI = 3 and indJ = 0
        //rows = 6 and cols = 3
        int rows = idxI + 3;
        int cols = idxJ + 3;
        //and because i initializes to idxI but only goes to rows, we loop 3 times (once for each row)
        for (int i = idxI; i < rows; i++) {
            //same for columns
            for (int j = idxJ; j < cols; j++) {
                if (board[i][j] == '.') {
                    continue;
                }
                
                if (blockSet.contains(board[i][j])) {
                    return false;
                }

                blockSet.add(board[i][j]);
            }
        }

        return true;
    }
}
