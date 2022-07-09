class Solution {
    public boolean isValidSudoku(char[][] board) {
        HashSet<String> h1 = new HashSet<String>();
        
        for(int i=0; i < 9; i++){
            for(int j=0; j< 9; j++){
                if(board[i][j] != '.'){
                    
                //Check whether HashSet contains duplicate elements in row and column 
                if(h1.contains("row" + i + board[i][j]) || h1.contains("col" + j + board[i][j]) ){
                    return false;
                }
                h1.add("row" + i + board[i][j]);
                h1.add("col" + j + board[i][j]);
                
                
                //Check whether Box contains duplicate elements in it
                if(h1.contains("box"+ (i/3) + (j/3) + board[i][j])){
                    return false;
                }
                h1.add("box"+ (i/3) + (j/3) + board[i][j]);
                }
            }
        }
        
        
        return true;
    }
}
