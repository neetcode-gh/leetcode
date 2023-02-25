class Solution {
    fun swimInWater(grid: Array<IntArray>): Int {
        val visited = Array<BooleanArray>(grid.size){ BooleanArray(grid[0].size) }
        val minHeap = PriorityQueue<IntArray>{ a: IntArray, b: IntArray -> a[0] - b[0] } //[height, r, c]
        val directions = arrayOf(intArrayOf(1,-1,0,0),intArrayOf(0,0,1,-1))
        minHeap.add(intArrayOf(grid[0][0],0,0)) //startpos
        while(!minHeap.isEmpty()){
            val (h,r,c) = minHeap.poll()
            visited[r][c] = true
            if(r == grid.size-1 && c == grid[0].size-1)
                return h
            for(i in 0..3){
                val nextR = r + directions[0][i]
                val nextC = c + directions[1][i]
                if(isValid(grid,visited,nextR, nextC))
                    minHeap.add(intArrayOf(maxOf(h,grid[nextR][nextC]),nextR,nextC))
            }
        }
        return -1
    }
    private fun isValid(
        grid: Array<IntArray>,
        visited: Array<BooleanArray>,
        r: Int,
        c: Int
    ) = r >= 0 && c >= 0 && r < grid.size && c < grid[0].size && visited[r][c] == false
}
