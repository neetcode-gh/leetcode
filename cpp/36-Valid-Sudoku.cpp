class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
      
  unordered_set <int> row[9];
    unordered_set<int> col[9];
    unordered_set<int> squ[3][3];
      
    for(int i=0;i<9;i++)
        for(int j=0;j<9;j++)
        {
            if (board[i][j]=='.')
                continue;
            else if(row[i].find(board[i][j]) !=row[i].end()
                   || col[j].find(board[i][j]) !=col[j].end()
                    || squ[i/3][j/3].find(board[i][j]) !=squ[i/3][j/3].end()
                   )
                return false;
            else
            {
                row[i].insert(board[i][j]);
                col[j].insert(board[i][j]);
                squ[i/3][j/3].insert(board[i][j]);
                
            }
        }
        return 1;}
};
