class Solution {
    fun minTime(n: Int, edges: Array<IntArray>, hasApple: List<Boolean>): Int {
        val adj = HashMap<Int, MutableList<Int>>().apply {
            for ((par, child) in edges) {
                this[par] = (this[par] ?: mutableListOf<Int>()).apply { add(child) }
                this[child] = (this[child] ?: mutableListOf<Int>()).apply { add(par) }
            }
        }

        fun dfs(cur: Int, par: Int): Int {
            var time = 0

            adj[cur]?.forEach { child ->
                if (child != par) {
                    val childTime = dfs(child, cur)
                    if (childTime > 0 ||hasApple[child])
                        time += 2 + childTime
                }
            }

            return time
        }

        return dfs(0, -1)
    }
}
