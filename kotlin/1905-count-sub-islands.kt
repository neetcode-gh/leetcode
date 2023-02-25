class Solution {
    fun countSubIslands(grid1: Array<IntArray>, grid2: Array<IntArray>): Int {
        
        fun isValid(i: Int, j: Int) = i in (0 until grid2.size) && j in (0 until grid2[0].size) && grid2[i][j] == 1
        
        val dir = arrayOf(
            intArrayOf(1,0), 
            intArrayOf(-1,0), 
            intArrayOf(0,1), 
            intArrayOf(0,-1)
        )
        
        fun dfs(i: Int, j: Int): Boolean {
            if(grid1[i][j] != 1)
                return false
            grid2[i][j] = 0
            var found = true
            for((iD,jD) in dir){
                val iN = i + iD
                val jN = j + jD
                if(isValid(iN, jN))
                  found = found and dfs(iN, jN)
            }
            return found
        }
        
        var count = 0
        for(i in 0 until grid1.size){
            for(j in 0 until grid1[0].size){
                if(grid1[i][j] == 1 && grid2[i][j] == 1)
                    if(dfs(i, j) == true)
                        count++
            }
        }            
        return count
    }
}
