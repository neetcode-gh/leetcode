class Solution {
    
    val dirs = arrayOf(intArrayOf(0,1), 
                       intArrayOf(0,-1), 
                       intArrayOf(1,0), 
                       intArrayOf(-1,0))
    
    fun pacificAtlantic(grid: Array<IntArray>): List<List<Int>> {
        if(grid.size == 0) return emptyList()
        val result = mutableListOf<List<Int>>()
        
        val pacific = Array(grid.size) { BooleanArray(grid[0].size) }
        val atlantic = Array(grid.size) { BooleanArray(grid[0].size) }
        
        for(i in 0 until grid.size) {
            dfs(grid, Integer.MIN_VALUE, i, 0, pacific)
            dfs(grid, Integer.MIN_VALUE, i, grid[0].size - 1, atlantic)
        }
        
        for(i in 0 until grid[0].size) {
            dfs(grid, Integer.MIN_VALUE, 0, i, pacific)
            dfs(grid, Integer.MIN_VALUE, grid.size - 1, i, atlantic)
        }
        
        for(i in 0 until grid.size) {
            for(j in 0 until grid[0].size) {
                if(atlantic[i][j] && pacific[i][j]) result.add(listOf(i, j))
            }
        }
        
        return result
    }
    
    private fun dfs(grid: Array<IntArray>, height: Int, i: Int, j: Int, visited: Array<BooleanArray>) {
        if(i < 0 || i >= grid.size || j < 0 || j >= grid[0].size || grid[i][j] < height || visited[i][j]) return
        
        visited[i][j] = true
        
        dirs.forEach { dir -> 
            dfs(grid, grid[i][j], dir[0] + i, dir[1] + j, visited)
        }
    }
}