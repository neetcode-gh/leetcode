class Solution {
    fun findAllPeople(n: Int, meetings: Array<IntArray>, firstPerson: Int): List<Int> {
        val secrets = mutableSetOf(0, firstPerson)
        val timeMap = mutableMapOf<Int, MutableMap<Int, MutableList<Int>>>()

        for ((src, dst, t) in meetings) {
            if (t !in timeMap)
                timeMap[t] = mutableMapOf()
            timeMap[t]!!.getOrPut(src) { mutableListOf() }.apply { add(dst) }
            timeMap[t]!!.getOrPut(dst) { mutableListOf() }.apply { add(src) }
        }

        fun dfs(
            src: Int, 
            adj: MutableMap<Int, MutableList<Int>>, 
            visit: MutableSet<Int>
        ) {
            if (src in visit) return
            visit.add(src)
            secrets.add(src)
            adj[src]?.forEach { nei -> 
                dfs(nei, adj, visit) 
            }
        }

        timeMap.keys.sorted().forEach { t ->
            val visit = mutableSetOf<Int> ()
            timeMap[t]?.keys?.forEach { src ->
                if (src in secrets) {
                    dfs(src, timeMap[t]!!, visit)
                }
            }
        }

        return secrets.toList()
    }
}
