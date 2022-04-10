class Solution {
public:
    bool solve(vector<vector<char>>& board, const string &word, int ROWS, int COLS, int r, int c, int idx) {
        // checked full word
        if (idx == word.size())
            return true;
        // boundary check
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS)
            return false;
        // visit and letter check
        if (word[idx] != board[r][c])
            return false;

        // mark as visited and backtrack
        char origin = board[r][c];
        board[r][c] = '$';
        bool result = solve(board, word, ROWS, COLS, r + 1, c, idx+1)
            || solve(board, word, ROWS, COLS, r - 1, c, idx+1)
            || solve(board, word, ROWS, COLS, r, c + 1, idx+1)
            || solve(board, word, ROWS, COLS, r, c - 1, idx+1);
        board[r][c] = origin;
        return result;
    }

    bool exist(vector<vector<char>>& board, string word) {
        int ROWS = board.size(), COLS = board[0].size();
        for (int i = 0; i < ROWS; ++i)
            for (int j = 0; j < COLS; ++j)
                if (solve(board, word, ROWS, COLS, i, j, 0))
                    return true;
        return false;
    }
};
