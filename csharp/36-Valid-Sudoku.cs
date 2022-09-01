public class Solution {
    public bool IsValidSudoku(char[][] board) {
        var rows = new Dictionary<int, HashSet<char>>();        
        var cols = new Dictionary<int, HashSet<char>>();
        var squares = new Dictionary<(int, int), HashSet<char>>();
        
        for(var r = 0; r < 9; r++) {
            rows[r] = new HashSet<char>();
            for(var c = 0; c < 9; c++) {
                if(!cols.ContainsKey(c)) cols[c] = new HashSet<char>();
                if(!squares.ContainsKey((r/3, c/3))) 
                    squares[(r/3, c/3)] = new HashSet<char>();
                
                if(board[r][c] == '.') continue;
                
                
                if(rows[r].Contains(board[r][c]) ||
                  cols[c].Contains(board[r][c]) || 
                  squares[(r / 3, c / 3)].Contains(board[r][c]))
                   return false;
                
                rows[r].Add(board[r][c]);
                cols[c].Add(board[r][c]);
                squares[(r / 3, c / 3)].Add(board[r][c]);
            }
        }
        
        return true;
    }
}