class Solution {
    fun maxProbability(n: Int, edges: Array<IntArray>, succProb: DoubleArray, start: Int, end: Int): Double {
        val adj = HashMap<Int, ArrayList<Pair<Int, Double>>>().apply {
            for ((i, edge) in edges.withIndex()) {
                val (u, v) = edge
                this[u] = getOrDefault(u, ArrayList<Pair<Int, Double>>()).apply { add(v to succProb[i]) }
                this[v] = getOrDefault(v, ArrayList<Pair<Int, Double>>()).apply { add(u to succProb[i]) }
            }
        }

        val visited = HashSet<Int>()
        val minHeap = PriorityQueue<Pair<Int, Double>>{ a, b -> 
            if (a.second < b.second) 1 else -1
        }

        with (minHeap) {
            add(start to 1.0)

            while (isNotEmpty()) {
                val (node, currProb) = poll()
                visited.add(node)

                if (node == end) return currProb

                adj[node]?.forEach {
                    if (it.first !in visited) {
                        add(it.first to currProb * it.second)
                    }
                }
            }
        }
        
        return 0.0
    }
}
