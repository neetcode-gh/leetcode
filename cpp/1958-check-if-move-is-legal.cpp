class Solution {
public:
    bool checkMove(vector<vector<char>>& board, int rMove, int cMove, char color) {
        const int ROWS = board.size(), COLS = board[0].size();
        int direction[8][4] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1},
                               {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};
        board[rMove][cMove] = color;
        
        function<bool(int, int, char, int[])> legal = [&] (int row, int col, char color, int direc[]) -> bool {
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
        };
        
        for(auto& d: direction)
            if(legal(rMove, cMove, color, d)) return true;
        return false;
    }
};
