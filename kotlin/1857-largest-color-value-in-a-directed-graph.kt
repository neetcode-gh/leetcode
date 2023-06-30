class Solution {
    fun largestPathValue(colors: String, edges: Array<IntArray>): Int {
        val adj = HashMap<Int, ArrayList<Int>>()
        for ((from, to) in edges)
            adj[from] = adj.getOrDefault(from, ArrayList<Int>()).apply{this.add(to)}

        val visited = HashSet<Int>()
        val path = HashSet<Int>()
        val count = Array(colors.length){IntArray(26)}

        fun dfs(node: Int): Int {
            if (node in path)
                return Integer.MAX_VALUE
            if (node in visited)
                return 0
            
            visited.add(node)
            path.add(node)

            val colorIndex = colors[node] - 'a'
            count[node][colorIndex] = 1

            adj[node]?.forEach{ nei ->
                if (dfs(nei) == Integer.MAX_VALUE)
                    return Integer.MAX_VALUE
                (0 until 26).forEach{ c ->
                    count[node][c] = maxOf(
                        count[node][c],
                        count[nei][c] + if(c == colorIndex) 1 else 0
                    )
                }
            } 

            path.remove(node)
            return count[node].max()!!
        }

        var res = 0
        for (i in 0 until colors.length) {
            res = maxOf(res, dfs(i))
        }

        return if(res == Integer.MAX_VALUE) -1 else res
    }
}
