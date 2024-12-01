// If we can't do inplace, space O(N)
class Solution {
    fun uniquePathsWithObstacles(grid: Array<IntArray>): Int {

        val m = grid.lastIndex
        val n = grid[0].lastIndex

        if (grid[m][n] == 1 || grid[0][0] == 1) return 0
        
        val dp = IntArray(n+1)
        dp[n] = 1

        for (i in m downTo 0) {
            for (j in n downTo 0) {
                if (grid[i][j] == 1) dp[j] = 0
                else if (j < n) dp[j] = dp[j] + dp[j + 1]
                //else dp[j] = dp[j] + 0
            }
        }
    
        return dp[0]
    }
}

// In place O(1)
class Solution {
    fun uniquePathsWithObstacles(grid: Array<IntArray>): Int {

        val m = grid.lastIndex
        val n = grid[0].lastIndex

        if (grid[m][n] == 1 || grid[0][0] == 1) return 0
        
        grid[m][n] = 1

        for (i in m-1 downTo 0) {
            grid[i][n] = if(grid[i][n] == 0 && grid[i + 1][n] == 1) 1 else 0
        }

        for (i in n-1 downTo 0) {
            grid[m][i] = if(grid[m][i] == 0 && grid[m][i + 1] == 1) 1 else 0
        }

        for (i in m-1 downTo 0) {
            for (j in n-1 downTo 0) {
                if(grid[i][j] != 1) {
                    grid[i][j] = grid[i + 1][j] + grid[i][j + 1]
                } else {
                    grid[i][j] = 0
                }   
            }
        }
    
        return grid[0][0]
    }
}
