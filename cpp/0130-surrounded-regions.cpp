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
        
        // marking escaped cells along the border
        for (int i = 0; i < m; i++) {
            dfs(board,i,0,m,n);
            dfs(board,i,n-1,m,n);
        }
        
        for (int j = 0; j < n; j++) {
            dfs(board,0,j,m,n);
            dfs(board,m-1,j,m,n);
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

/*
   BFS Solution
*/

class Solution {
private:
    int rows, cols;

    void bfs(int row, int col, vector<vector<char>>& board) {
        board[row][col] = 'E';
        queue<pair<int, int>> q;
        q.push({row, col});

        vector<pair<int, int>> directions = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}};
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            for (const auto &direction : directions) {
                int newRow = r + direction.first;
                int newCol = c + direction.second;
                if (newRow < rows && newRow >= 0 && newCol < cols && newCol >= 0 && board[newRow][newCol] == 'O') {
                    board[newRow][newCol] = 'E';
                    q.push({newRow, newCol});
                }
            }
        }

    }

public:
    void solve(vector<vector<char>>& board) {
        rows = board.size();    
        cols = board[0].size();

        for (int row = 0; row < rows; ++row) {
            if (board[row][0] == 'O') bfs(row, 0, board);
            if (board[row][cols - 1] == 'O') bfs(row, cols - 1, board);
        }

        for (int col = 0; col < cols; ++col) {
            if (board[0][col] == 'O') bfs(0, col, board);
            if (board[rows - 1][col] == 'O') bfs(rows - 1, col, board);
        }

        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (board[row][col] == 'O') {
                    board[row][col] = 'X';
                }
                else if (board[row][col] == 'E') {
                    board[row][col] = 'O';
                }
            }
        }

    }
};
