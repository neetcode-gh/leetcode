/*
* BFS
*/
class Solution {
    fun isBipartite(graph: Array<IntArray>): Boolean {
        if (graph.isEmpty()) return true
        val nodeColorMap = mutableMapOf<Int, Color>()

        fun bfs(startNode: Int): Boolean {
            // if the node is already colored, return true
            if (startNode in nodeColorMap.keys) return true
            nodeColorMap[startNode] = Color.RED

            val queue = (LinkedList<Int>() as Queue<Int>).apply { add(startNode) }
            while (queue.isNotEmpty()) {
                val currentNode = queue.remove()
                val colorOfCurrentNode = nodeColorMap.getValue(currentNode)
                for (adjacentNode in graph[currentNode]) {
                    if (adjacentNode in nodeColorMap.keys) {
                        val colorOfAdjacentNode = nodeColorMap.getValue(adjacentNode)
                        if (colorOfAdjacentNode == colorOfCurrentNode) return false
                     continue

                    }
                    nodeColorMap[adjacentNode] = colorOfCurrentNode.inverse
                    queue.add(adjacentNode)
                }
            }
            return true
        }

        for (node in graph.indices) {
            if (!bfs(node)) return false
        }

        return true
    }

    private enum class Color { RED, GREEN }

    private val Color.inverse
        get() = when (this) {
            Color.RED -> Color.GREEN
            Color.GREEN -> Color.RED
        }
}

/*
* DFS
*/
class Solution {
    fun isBipartite(graph: Array<IntArray>): Boolean {
        if (graph.isEmpty()) return true
        
        val nodeColorMap = mutableMapOf<Int, Color>()
        fun dfs(node: Int, defaultColor: Color): Boolean {
            if (node !in nodeColorMap.keys) nodeColorMap[node] = defaultColor
            for (adjacentNode in graph[node]) {
                val isEdgeVisited = nodeColorMap[adjacentNode] != null
                if (isEdgeVisited) {
                    val colorOfCurrentNode = nodeColorMap.getValue(node)
                    val colorOfAdjacentNode = nodeColorMap.getValue(adjacentNode)
                    if (colorOfAdjacentNode == colorOfCurrentNode) return false
                    else continue
                }
                if (!dfs(adjacentNode, defaultColor.inverse)) return false
            }
            return true
        }

        for (node in graph.indices) {
            if (node in nodeColorMap.keys) continue
            if (!dfs(node, Color.RED)) return false
        }
        return true
    }

    private enum class Color { RED, GREEN }

    private val Color.inverse
        get() = when (this) {
            Color.RED -> Color.GREEN
            Color.GREEN -> Color.RED
        }
}

/*
* Union Find
*/
class Solution {

    class DSU(val n: Int) {

        val parent = IntArray(n) { it }
        val rank = IntArray(n) { 1 }

        fun find(x: Int): Int {
            if (x != parent[x])
                parent[x] = find(parent[x])
            return parent[x]
        }

        fun union(x: Int, y: Int) {
            val px = find(x)
            val py = find(y)

            if (rank[px] >= rank[py]) {
                parent[py] = px
                rank[px] += rank[py]
            } else {
                parent[px] = py
                rank[py] += rank[px]
            }
        }
    }

    fun isBipartite(graph: Array<IntArray>): Boolean {
        val dsu = DSU(graph.size)

        for (i in 0 until graph.size) {
            for (j in graph[i]) {
                if (dsu.find(i) == dsu.find(j))
                    return false
                dsu.union(graph[i][0], j)
            }
        }

        return true
    }
}
