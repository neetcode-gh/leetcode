class Solution {
    fun eventualSafeNodes(graph: Array<IntArray>): List<Int> {
        val resultantList = mutableListOf<Int>()
        // -1 -> non-safe node, 0 -> unknown, 1-> safe node
        val safeState = IntArray(graph.size)
        val visitedNode = hashSetOf<Int>()

        fun isSafe(currentNode: Int): Boolean {
            visitedNode.add(currentNode)
            for (adjacentNode in graph[currentNode]) {
                if (safeState[adjacentNode] == 1) continue
                if (
                    adjacentNode in visitedNode ||
                    safeState[adjacentNode] == -1 ||
                    !isSafe(adjacentNode)
                ) {
                    safeState[adjacentNode] = -1
                    safeState[currentNode] = -1
                    return false
                }
            }
            safeState[currentNode] = 1
            return true
        }

        for (node in graph.indices) {
            if (safeState[node] == -1) continue
            if (safeState[node] == 1 || isSafe(node)) resultantList.add(node)
        }
        return resultantList
    }
}