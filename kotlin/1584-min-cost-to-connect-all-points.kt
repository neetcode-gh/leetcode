class Solution {
    fun minCostConnectPoints(points: Array<IntArray>): Int {
        val minHeap = PriorityQueue<Pair<Int,Int>> { a: Pair<Int, Int>, b: Pair<Int, Int> -> a.second - b.second } // sort by distance
        val visited = HashSet<Int>()
        var minCost = 0    
        minHeap.add(Pair(0,0))
        while(visited.size < points.size){
            val (node,cost) = minHeap.poll()
            if(visited.contains(node))
                continue
            minCost += cost
            visited.add(node)
            for(i in 0..points.size-1){
                val (nextX,nextY) = points[i]
                val (currentX, CurrentY) = points[node]
                val distance = Math.abs(currentX - nextX) + Math.abs(CurrentY - nextY)
                minHeap.add(Pair(i,distance))
            }
        }
        return minCost
    }
}
