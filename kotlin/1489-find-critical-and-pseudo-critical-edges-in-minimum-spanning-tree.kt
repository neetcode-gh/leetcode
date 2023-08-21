class Solution {

    class UnionFind(val n: Int) {
        val par = IntArray (n) { it }
        val rank = IntArray (n) { 1 }

        fun find(x: Int): Int {
            if (par[x] != x)
                par[x] = find(par[x])
            return par[x]
        }

        fun union(x: Int, y: Int): Boolean {
            val px = find(x)
            val py = find(y)
            if (px == py) return false
            if (rank[px] > rank[py]) {
                par[py] = px
                rank[px] += rank[py]
            } else {
                par[px] = py
                rank[py] += rank[px]
            }
            return true
        }
    }

    fun findCriticalAndPseudoCriticalEdges(n: Int, _edges: Array<IntArray>): List<List<Int>> {
        val edges = _edges.mapIndexed { i, v ->
            intArrayOf(v[0], v[1], v[2], i)
        }.sortedWith(
            Comparator { a, b ->
                a[2] - b[2]
            }
        )

        var mstWeight = 0
        val uf = UnionFind (n)
        for ((u, v, w, i) in edges) {
            if (uf.union(u, v)) mstWeight += w
        }

        val crit = mutableListOf<Int>()
        val pseudo = mutableListOf<Int>()
        for ((u, v, w, i) in edges) {
            val uf2 = UnionFind (n)
            var mstWeightWithout = 0
            for ((u2, v2, w2, i2) in edges) {
                if (i != i2 && uf2.union(u2, v2))  mstWeightWithout += w2
            }
            if (uf2.rank.max()!! != n || mstWeightWithout > mstWeight) {
                crit.add(i)
                continue
            }
                
            val uf3 = UnionFind (n)
            uf3.union(u, v)
            var mstWeightWith = w
            for ((u3, v3, w3, i3) in edges) {
                if (uf3.union(u3, v3))  mstWeightWith += w3
            }
            if (mstWeightWith == mstWeight) pseudo.add(i)
        }

        return listOf(crit, pseudo)
    }
}
