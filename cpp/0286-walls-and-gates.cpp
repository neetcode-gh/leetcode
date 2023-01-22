/*
    Given grid: -1 wall, 0 gate, INF empty, fill each empty w/ dist to nearest gate

    BFS traversal, shortest path from each gate to all empty rooms
    Each gate only looks at within 1 space, then next gate, guarantees shortest

    Time: O(m x n)
    Space: O(m x n)
*/

class Solution {
public:
    void wallsAndGates(vector<vector<int>>& rooms) {
        int m = rooms.size();
        int n = rooms[0].size();
        
        queue<pair<int, int>> q;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rooms[i][j] == 0) {
                    q.push({i, j});
                }
            }
        }
        
        while (!q.empty()) {
            int row = q.front().first;
            int col = q.front().second;
            q.pop();
            
            for (int i = 0; i < 4; i++) {
                int x = row + dirs[i][0];
                int y = col + dirs[i][1];
                
                if (x < 0 || x >= m || y < 0 || y >= n || rooms[x][y] != INT_MAX) {
                    continue;
                }
                
                rooms[x][y] = rooms[row][col] + 1;
                q.push({x, y});
            }
        }
    }
private:
    vector<vector<int>> dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
};
