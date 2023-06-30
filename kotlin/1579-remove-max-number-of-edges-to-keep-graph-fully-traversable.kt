class Solution {

    class DSU(val n: Int) {
        val parent = IntArray(n + 1) {it}
        val rank = IntArray(n + 1) {1}
        var components = n

        fun find(x: Int): Int {
            if (parent[x] != x)
                parent[x] = find(parent[x])
            return parent[x]
        }

        fun union(x: Int, y: Int): Boolean {
            val pX = find(x)
            val pY = find(y)

            if (pY == pX)
                return false

            if (rank[pX] > rank[pY]) {
                rank[pX] += rank[pY]
                parent[pY] = pX
            } else {
                rank[pY] += rank[pX]
                parent[pX] = pY
            }

            components--
            return true
        }

        fun connected() = components == 1
    }

    fun maxNumEdgesToRemove(n: Int, edges: Array<IntArray>): Int {
        val a = DSU(n)
        val b = DSU(n)

        var edgeAdded = 0
        for ((type, u, v) in edges) {
            if (type == 3) {
                if (a.union(u, v) or b.union(u, v))
                        edgeAdded++
            }
        }

        for ((type, u, v) in edges) {
            when (type) {
                1 -> {
                    if (a.union(u, v))
                        edgeAdded++
                }
                2 -> {
                    if (b.union(u, v))
                        edgeAdded++
                }
            }
        }

        return if (a.connected() && b.connected()) edges.size - edgeAdded else -1
    }
}
