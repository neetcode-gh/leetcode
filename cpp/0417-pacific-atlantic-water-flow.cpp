/*
    Top & left pacific, bottom & right atlantic, determine spots that flow to both

    Instead go outside in, from oceans to spots where rain could flow from
    Faster bc avoids repeated work: cells along a path can also reach that ocean

    Time: O(m x n)
    Space: O(m x n)
*/

class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int m = heights.size();
        int n = heights[0].size();
        
        vector<vector<bool>> pacific(m, vector<bool>(n));
        vector<vector<bool>> atlantic(m, vector<bool>(n));
        
        for (int i = 0; i < m; i++) {
            dfs(heights, pacific, i, 0, m, n);
            dfs(heights, atlantic, i, n - 1, m, n);
        }
        
        for (int j = 0; j < n; j++) {
            dfs(heights, pacific, 0, j, m, n);
            dfs(heights, atlantic, m - 1, j, m, n);
        }
        
        vector<vector<int>> result;
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pacific[i][j] && atlantic[i][j]) {
                    result.push_back({i, j});
                }
            }
        }
        
        return result;
    }
private:
    void dfs(vector<vector<int>>& heights, vector<vector<bool>>& visited,
        int i, int j, int m, int n) {
        
        visited[i][j] = true;
        
        if (i > 0 && !visited[i - 1][j] && heights[i - 1][j] >= heights[i][j]) {
            dfs(heights, visited, i - 1, j, m, n);
        }
        if (i < m - 1 && !visited[i + 1][j] && heights[i + 1][j] >= heights[i][j]) {
            dfs(heights, visited, i + 1, j, m, n);
        }
        if (j > 0 && !visited[i][j - 1] && heights[i][j - 1] >= heights[i][j]) {
            dfs(heights, visited, i, j - 1, m, n);
        }
        if (j < n - 1 && !visited[i][j + 1] && heights[i][j + 1] >= heights[i][j]) {
            dfs(heights, visited, i, j + 1, m, n);
        }
    }
};


/*
    BFS solution
*/

class Solution {
private:
    int rows, cols;

    void bfs(queue<pair<int, int>>& q, vector<vector<bool>>& visited, vector<vector<int>>& heights) {

        vector<pair<int, int>> directions = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}};
        while (!q.empty()) {
            auto [row, col] = q.front();
            q.pop();
            for (const auto &direction : directions) {
                int newRow = row + direction.first;
                int newCol = col + direction.second;
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !visited[newRow][newCol] 
                               && heights[newRow][newCol] >= heights[row][col]) {
                    q.push({newRow, newCol});
                    visited[newRow][newCol] = true;
                }
            }
        }
    }
    
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        rows = heights.size();
        cols = heights[0].size();
        vector<vector<int>> results;
        queue<pair<int, int>> pacificQueue;
        queue<pair<int, int>> atlanticQueue;
        vector<vector<bool>> pacific(rows, vector<bool>(cols, false));
        vector<vector<bool>> atlantic(rows, vector<bool>(cols, false));

        for (int row = 0; row < rows; ++row) {
            pacific[row][0] = true;
            atlantic[row][cols - 1] = true;
            pacificQueue.push({row, 0});
            atlanticQueue.push({row, cols-1});
        }

        for (int col = 0; col < cols; ++col) {
            pacific[0][col] = true;
            atlantic[rows - 1][col] = true;
            pacificQueue.push({0, col});
            atlanticQueue.push({rows - 1, col});
        }

        bfs(pacificQueue, pacific, heights);
        bfs(atlanticQueue, atlantic, heights);

        for (int row = 0; row < rows; ++row) {
            for (int col = 0; col < cols; ++col) {
                if (pacific[row][col] && atlantic[row][col]) {
                    results.push_back({row, col});
                }
            }
        }

        return results;
    
    }
};
