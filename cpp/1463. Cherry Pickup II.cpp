//   https://leetcode.com/problems/cherry-pickup-ii/


// You are given a rows x cols matrix grid representing a field of cherries where grid[i][j] represents the number of cherries that you can collect from the (i, j) cell.

// You have two robots that can collect cherries for you:

// Robot #1 is located at the top-left corner (0, 0), and
// Robot #2 is located at the top-right corner (0, cols - 1).
// Return the maximum number of cherries collection using both robots by following the rules below:

// From a cell (i, j), robots can move to cell (i + 1, j - 1), (i + 1, j), or (i + 1, j + 1).
// When any robot passes through a cell, It picks up all cherries, and the cell becomes an empty cell.
// When both robots stay in the same cell, only one takes the cherries.
// Both robots cannot move outside of the grid at any moment.
// Both robots should reach the bottom row in grid.


Solution:

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int cherryPickup(vector<vector<int>>& grid) {
        int rows = grid.size();
        int cols = grid[0].size();

        vector<vector<vector<int>>> dp(rows, vector<vector<int>>(cols, vector<int>(cols, 0)));

        for (int i = rows - 1; i >= 0; --i) {
            for (int j = 0; j < cols; ++j) {
                for (int k = 0; k < cols; ++k) {
                    int cherries = grid[i][j] + (j != k ? grid[i][k] : 0);
                    if (i == rows - 1) {
                        dp[i][j][k] = cherries;
                    } else {
                        int maxCherries = 0;
                        for (int dj = -1; dj <= 1; ++dj) {
                            for (int dk = -1; dk <= 1; ++dk) {
                                int nj = j + dj;
                                int nk = k + dk;
                                if (nj >= 0 && nj < cols && nk >= 0 && nk < cols) {
                                    maxCherries = max(maxCherries, dp[i + 1][nj][nk]);
                                }
                            }
                        }
                        dp[i][j][k] = cherries + maxCherries;
                    }
                }
            }
        }
        
        return dp[0][0][cols - 1];
    }
};
