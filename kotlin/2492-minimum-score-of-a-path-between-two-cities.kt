class Solution {
    fun minScore(n: Int, roads: Array<IntArray>): Int {
        var res = Integer.MAX_VALUE
        val adj = HashMap<Int, ArrayList<Pair<Int, Int>>>()

        for((a,b,d) in roads) {
            adj[a] = adj.getOrDefault(a, ArrayList()).apply{
                this.add(b to d)
            }
            adj[b] = adj.getOrDefault(b, ArrayList()).apply{
                this.add(a to d)
            }
        }

        val visited = HashSet<Int>()

        fun dfs(curr: Int) {
            if(curr in visited)
                return
            visited.add(curr)
            for((neigh, dist) in adj[curr]!!) {
                res = minOf(res, dist)
                dfs(neigh)
            }
        }

        dfs(1)
        return res
    }
}
