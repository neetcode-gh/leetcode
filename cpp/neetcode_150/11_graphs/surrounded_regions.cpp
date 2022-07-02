/*
    Given a matrix, capture ('X') all regions that are surrounded ('O')

    Distinguish captured vs escaped, 'X' vs 'O' vs 'E'

    Time: O(m x n)
    Space: O(m x n)
*/

class Solution {
public:
    void solve(vector<vector<char>>& board) {
        int m = board.size();
        int n = board[0].size();
        
        vector<pair<int, int>> borders;
        
        // get list of border cells
        for (int i = 0; i < m; i++) {
            borders.push_back({i, 0});
            borders.push_back({i, n - 1});
        }
        for (int j = 0; j < n; j++) {
            borders.push_back({0, j});
            borders.push_back({m - 1, j});
        }
        
        // mark escaped cells
        for (int i = 0; i < borders.size(); i++) {
            int x = borders[i].first;
            int y = borders[i].second;
            dfs(board, x, y, m, n);
        }
        
        // flip cells to correct final states
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                }
                if (board[i][j] == 'E') {
                    board[i][j] = 'O';
                }
            }
        }
    }
private:
    void dfs(vector<vector<char>>& board, int i, int j, int m, int n) {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') {
            return;
        }
        
        board[i][j] = 'E';
        
        dfs(board, i - 1, j, m, n);
        dfs(board, i + 1, j, m, n);
        dfs(board, i, j - 1, m, n);
        dfs(board, i, j + 1, m, n);
    }
};
