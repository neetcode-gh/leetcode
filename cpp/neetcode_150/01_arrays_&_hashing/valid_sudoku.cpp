/*
    using 3 Hashmaps for (row,column and squares)

    Time: O(n^2)
    Space: O(n^2)
*/

class Solution {
public:
    
    bool isValidSudoku(vector<vector<char>>& board) {
       unordered_map <int,vector<char>> row;
        unordered_map <int,vector<char>> col;
        unordered_map <int,vector<char>> sqrs;
        
        for(int r=0;r<9;r++){
                
            for(int c=0;c<9;c++){
                
                if(board[r][c]=='.')
                    continue;
                int box = (r/3)*3+(c/3);
                vector <char> curr_row(row[r]),curr_col(col[c]),curr_box(sqrs[box]);
 
               if((find(curr_row.begin(),curr_row.end(),board[r][c])!=curr_row.end()) or 
                   (find(curr_col.begin(),curr_col.end(),board[r][c])!=curr_col.end()) or
                    (find(curr_box.begin(),curr_box.end(),board[r][c])!=curr_box.end()))
                    return false;               
                row[r].push_back(board[r][c]);
                col[c].push_back(board[r][c]);
                sqrs[box].push_back(board[r][c]);
            }
            
            
        }
        
        return true;
    }
};
