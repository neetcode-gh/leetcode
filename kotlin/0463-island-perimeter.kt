class Solution {
    fun islandPerimeter(grid: Array<IntArray>): Int {
        if(grid.size == 0 || grid[0].size == 0)
            return 0
        var res = 0
        for(i in 0..grid.size-1){
            for(j in 0..grid[0].size-1){
                if(grid[i][j]==1){
                    res += 4
                    if(i > 0 && grid[i-1][j]==1)
                        res -= 2
                    if(j > 0 && grid[i][j-1]==1)
                        res -= 2
                }
            }
        }
        return res
    }
}
