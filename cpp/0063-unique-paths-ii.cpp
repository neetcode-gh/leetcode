/*

Given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]).
The robot can only move either down or right at any point in time. An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

Example. obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
	 There is one obstacle in the middle of the 3x3 grid above.
	 There are two ways to reach the bottom-right corner:
         1. Right -> Right -> Down -> Down
         2. Down -> Down -> Right -> Right
	 So, the number of unique paths the robot can take is 2. Hence we return 2 as our answer.


Time: O(m * n)
Space: O(n)

*/


class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {

        int m = grid.size(), n = grid[0].size();
        if(grid[m-1][n-1] == 1 || grid[0][0] == 1) return 0;
        vector<long long> dp(n);
        dp[n-1] = 1;
        for(int i=m-1; i>=0; i--) {
            for(int j=n-1; j>=0; j--) {
                if(grid[i][j] == 1) dp[j] = 0;
                else if(j == n-1) continue;
                else dp[j] = dp[j] + dp[j+1];
            }
        }
        return dp[0];

    }
};
