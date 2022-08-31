class Solution {
    fun findRedundantConnection(edges: Array<IntArray>): IntArray {
        val uf = UnionFind(edges.size)

        for (edge in edges) {
            val (u, v) = edge

            if (uf.isConnected(u-1, v-1))
                return intArrayOf(u, v)

            uf.unify(u-1, v-1)
        }

        return intArrayOf(0)
    }
}

class UnionFind(n : Int) {
    val parent = IntArray(n) { it }
    val rank = IntArray(n) { 1 }

    fun unify(p: Int, q: Int) {
        val rootP = find(p)
        val rootQ = find(q)

        if (rootP == rootQ)
            return

        if (rank[rootP] > rank[rootQ]) {
            parent[rootQ] = parent[rootP]
            rank[rootP] += rank[rootQ]
        } else {
            parent[rootP] = parent[rootQ]
            rank[rootQ] += rank[rootP]
        }
    }

    fun find(p: Int): Int {
        var root = p
        var curr = p

        while (root != parent[root])
            root = parent[root]

        while (root != curr) {
            val next = parent[curr]
            parent[p] = parent[root]
            curr = next
        }

        return root
    }

    fun isConnected(p: Int, q: Int): Boolean {
        return find(p) == find(q)
    }
}