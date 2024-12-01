class Solution {
    fun maximumDetonation(b: Array<IntArray>): Int {
        val adj = HashMap<Int, ArrayList<Int>>().apply {
            for (i in b.indices) {
                for (j in b.indices) {
                    if (i != j) {
                        val dX = b[i][0].toDouble() - b[j][0].toDouble()
                        val dY = b[i][1].toDouble() - b[j][1].toDouble()
                        if ((b[i][2].toDouble() * b[i][2].toDouble()) >= (dX * dX + dY * dY))
                            this[i] = getOrDefault(i, ArrayList<Int>()).apply { add(j) }
                    }
                }
            }
        }

        fun dfs(i: Int, visit: HashSet<Int>) {
            if (i in visit)
                return
            visit.add(i)
            adj[i]?.forEach {
                dfs(it, visit)
            }
        }

        var res = 0
        for (i in b.indices) {
            val visit = HashSet<Int>()
            dfs(i, visit)
            res = maxOf(
                res,
                visit.size
            )
        }

        return res
    }
}
