class Solution {

    class UnionFind(val n: Int) {
        val parent = IntArray (n) { it }
        val size = IntArray (n) { 1 }

        fun find(i: Int): Int {
            if (i != parent[i])
                parent[i] = find(parent[i])
            return parent[i]
        }

        fun union(a: Int, b: Int): Boolean {
            val pa = find(a)
            val pb = find(b)
            if (pa == pb) return false
            if (size[pa] > size[pb]) {
                parent[pb] = pa
                size[pa] += size[pb]
            } else {
                parent[pa] = pb
                size[pb] += size[pa]
            }
            return true
        }
    }

    fun numberOfGoodPaths(vals: IntArray, edges: Array<IntArray>): Int {
        val adj = HashMap<Int, MutableList<Int>>().apply {
            for ((a, b) in edges) {
                this[a] = getOrDefault(a, mutableListOf<Int>()).apply { add(b) }
                this[b] = getOrDefault(b, mutableListOf<Int>()).apply { add(a) }
            }
        }

        val valueToIndex = TreeMap<Int, MutableList<Int>>().apply {
            for ((i, v) in vals.withIndex()) {
                this[v] = getOrDefault(v, mutableListOf<Int>()).apply { add(i) }
            }
        }

        var res = 0
        val uf = UnionFind(vals.size)
        valueToIndex.keys.forEach { value ->
            valueToIndex[value]?.forEach { i ->
                adj[i]?.forEach { nei ->
                    if (vals[nei] <= vals[i])
                        uf.union(nei, i)
                }
            }

            val count = HashMap<Int, Int>()
            valueToIndex[value]?.forEach { i ->
                val value = uf.find(i)
                count[value] = count.getOrDefault(value, 0) + 1
                res += count[value] ?: 0
            }
        }

        return res
    }
}
