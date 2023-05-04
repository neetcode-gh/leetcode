/*
* DFS Solution
*/
class Solution {
    fun minReorder(n: Int, connections: Array<IntArray>): Int {

        val neighbors = ArrayList<ArrayList<Int>>().apply {
            for (i in 0 until n)
                this.add(ArrayList<Int>())
            for ((u,v) in connections) {
                this.get(u).apply { this.add(v) }
                this.get(v).apply { this.add(u) }
            }
        }

        val edges = HashSet<String>().apply {
            for ((u,v) in connections)
                this.add("$u:$v")
        }

        var changes = 0
        val visited = BooleanArray(n)

        fun dfs(n: Int) {
            for (nei in neighbors[n]) {
                if (visited[nei] == true)
                    continue
                if ("$nei:$n" !in edges)
                    changes++
                visited[nei] = true
                dfs(nei)
            }
        }

        visited[0] = true
        dfs(0)

        return changes
    }
}

/*
* BFS Solution
*/
class Solution {
    fun minReorder(n: Int, connections: Array<IntArray>): Int {
        // node -> (adjacentNode,isArtificialEdge)
        val adjacencyList = mutableMapOf<Int, MutableList<Pair<Int, Boolean>>>()
        connections.forEach { (u, v) -> // O(E)
            adjacencyList.getOrPut(u) { mutableListOf() }.add(Pair(v, false))
            adjacencyList.getOrPut(v) { mutableListOf() }.add(Pair(u, true))
        }
        val queue = LinkedList<Int>().apply { add(0) }
        val visitedNodes = hashSetOf<Int>().apply { add(0) }
        var minNumberOfEdgesToReOrient = 0
        while (queue.isNotEmpty()) {
            val removedNode = queue.remove()
            for ((adjacentNode, isConnectedArtificially) in adjacencyList[removedNode] ?: mutableListOf()) {
                if (adjacentNode in visitedNodes) continue
                if (!isConnectedArtificially) minNumberOfEdgesToReOrient++
                visitedNodes.add(adjacentNode)
                queue.add(adjacentNode)
            }
        }
        return minNumberOfEdgesToReOrient
    }
}
