class Solution {
    fun calcEquation(equations: List<List<String>>, values: DoubleArray, queries: List<List<String>>): DoubleArray {
        val adj = HashMap<String, ArrayList<Pair<String, Double>>>().apply {
            for (i in equations.indices) {
                val (a, b) = equations[i]
                val value = values[i]
                this[a] = getOrDefault(a, arrayListOf()).apply { add(b to value) }
                this[b] = getOrDefault(b, arrayListOf()).apply { add(a to (1.0 / value)) }
            }
        }

        fun bfs(
            start: String, 
            end: String
        ): Double {
            if (start !in adj || end !in adj)
                return -1.0
            
            val visit = HashSet<String>()
            with (LinkedList<Pair<String, Double>>()) {
                addLast(start to 1.0)
                visit.add(start)

                while (isNotEmpty()) {
                    val (cur, totVal) = removeFirst()

                    if (cur == end) return totVal

                    adj[cur]?.forEach {
                        val (next, nextVal) = it
                        if (next !in visit) {
                            addLast(next to (totVal * nextVal))
                            visit.add(next)
                        }
                    }
                }
            }

            return -1.0
        }

        val res = DoubleArray(queries.size)
        for (i in queries.indices) {
            val (a, b) =  queries[i]
            res[i] = bfs(a, b)
        }
            
        return res
    }
}
