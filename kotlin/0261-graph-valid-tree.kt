class Solution {
    private lateinit var adjList: Array<MutableList<Int>>
    private val seen = mutableSetOf<Int>()

    fun validTree(n: Int, edges: Array<IntArray>): Boolean {
        if (edges.size != n-1) {
            return false
        }

        adjList = Array(n) { mutableListOf() }
        for (edge in edges) {
            adjList[edge[0]].add(edge[1])
            adjList[edge[1]].add(edge[0])
        }
        dfs(0)

        return seen.size == n
    }

    private fun dfs(node: Int) {
        if (seen.contains(node)) {
            return
        }
        seen.add(node)
        for (adj in adjList[node]) {
            dfs(adj)
        }
    }
}