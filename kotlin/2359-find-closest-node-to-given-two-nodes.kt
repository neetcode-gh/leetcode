// bfs
class Solution {
    fun closestMeetingNode(edges: IntArray, node1: Int, node2: Int): Int {
        val adj = HashMap<Int, MutableList<Int>>().apply {
            for ((u, v) in edges.withIndex()) {
                this[u] = getOrDefault(u, mutableListOf<Int>()).apply { add(v) }
            }
        }

        fun bfs(node: Int, distMap: HashMap<Int, Int>) {
            with (LinkedList<Pair<Int, Int>>()) {
                addLast(node to 0)
                distMap[node] = 0
                while (isNotEmpty()) {
                    val (node, dist) = removeFirst()
                    adj[node]?.forEach { nei ->
                        if (nei !in distMap) {
                            addLast(nei to dist + 1)
                            distMap[nei] = dist + 1
                        }
                    }
                }
            }
        }

        val node1Dist = HashMap<Int, Int>()
        val node2Dist = HashMap<Int, Int>()
        bfs(node1, node1Dist)
        bfs(node2, node2Dist)

        var res = -1
        var resDist = Integer.MAX_VALUE
        for (i in edges.indices) {
            if (i in node1Dist && i in node2Dist) {
                val dist = maxOf(node1Dist[i]!!, node2Dist[i]!!)
                if (dist < resDist) {
                    res = i
                    resDist = dist
                }
            }
        }

        return res
    }
}

// bfs, but omitting the adjecency graph since it's not needed. We know that every node has at most 1 outgoing edge,
// so we can use the edge list to find the next node.
class Solution {
    fun closestMeetingNode(edges: IntArray, node1: Int, node2: Int): Int {

        fun bfs(node: Int, distMap: HashMap<Int, Int>) {
            with (LinkedList<Pair<Int, Int>>()) {
                addLast(node to 0)
                distMap[node] = 0
                while (isNotEmpty()) {
                    val (node, dist) = removeFirst()
                    val nei = edges[node]
                    if (nei != -1 && nei !in distMap) {
                        addLast(nei to dist + 1)
                        distMap[nei] = dist + 1
                    }
                }
            }
        }

        val node1Dist = HashMap<Int, Int>()
        val node2Dist = HashMap<Int, Int>()
        bfs(node1, node1Dist)
        bfs(node2, node2Dist)

        var res = -1
        var resDist = Integer.MAX_VALUE
        for (i in edges.indices) {
            if (i in node1Dist && i in node2Dist) {
                val dist = maxOf(node1Dist[i]!!, node2Dist[i]!!)
                if (dist < resDist) {
                    res = i
                    resDist = dist
                }
            }
        }

        return res
    }
}

// dfs
class Solution {
    fun closestMeetingNode(edges: IntArray, node1: Int, node2: Int): Int {

        fun dfs(node: Int, distMap: HashMap<Int, Int>, dist: Int) {
            val nei = edges[node]
            if (nei != -1 && nei !in distMap) {
                distMap[nei] = dist + 1
                dfs(nei, distMap, dist + 1)
            }
        }

        val node1Dist = HashMap<Int, Int>().apply { this[node1] = 0 }
        val node2Dist = HashMap<Int, Int>().apply { this[node2] = 0 }
        dfs(node1, node1Dist, 0)
        dfs(node2, node2Dist, 0)

        var res = -1
        var resDist = Integer.MAX_VALUE
        for (i in edges.indices) {
            if (i in node1Dist && i in node2Dist) {
                val dist = maxOf(node1Dist[i]!!, node2Dist[i]!!)
                if (dist < resDist) {
                    res = i
                    resDist = dist
                }
            }
        }

        return res
    }
}
