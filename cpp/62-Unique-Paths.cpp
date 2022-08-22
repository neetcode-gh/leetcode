/*
    Given grid, return # of unique paths from top-left to bottom-right
    Ex. m = 3, n = 2 -> 3 unique paths (R->D->D, D->D->R, D->R->D)

    DP: edges have 1 unique path, inner cells consider where it comes from
    Recurrence relation: grid[i][j] = grid[i-1][j] + grid[i][j-1]

    Time: O(m x n)
    Space: O(m x n)
*/

class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<vector<int>> grid(m, vector<int>(n, 0));
        
        for (int i = 0; i < m; i++) {
            grid[i][0] = 1;
        }
        for (int j = 0; j < n; j++) {
            grid[0][j] = 1;
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                grid[i][j] = grid[i - 1][j] + grid[i][j - 1];
            }
        }
        
        return grid[m - 1][n - 1];
    }
};
