class Solution {
    //times[i] == [source, target, weight]
    fun networkDelayTime(times: Array<IntArray>, n: Int, k: Int): Int {
        val adjList = ArrayList<ArrayList<Pair<Int,Int>>>(times.size)
        for(i in 0..n)
            adjList.add(ArrayList<Pair<Int,Int>>())
        for(time in times){
            val (source, target, weight) = time
            adjList.get(source).add(Pair(target, weight))
        }
        //minheap stores [node, weight]
        val minHeap = PriorityQueue<IntArray>{ edge1: IntArray, edge2: IntArray ->
            edge1[1] - edge2[1]
        }
        val visited = HashSet<Int>()
        minHeap.add(intArrayOf(k,0))
        var time = 0 //the max of all the shortest paths
        while(!minHeap.isEmpty()){
            val (node, weight) = minHeap.poll()
            if(visited.contains(node))
                continue
            visited.add(node)
            time = maxOf(time, weight)
            val listofnodes = adjList.get(node)
            for(adjacent in listofnodes){
                val (adjNode, adjWeight) = adjacent
                if(!visited.contains(adjNode))
                    minHeap.add(intArrayOf(adjNode, adjWeight+weight)) // total path to each adjNode
            }
        }
        return if(visited.size == n) time else -1
    }
}
