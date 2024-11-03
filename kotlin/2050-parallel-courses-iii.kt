class Solution {
    fun minimumTime(n: Int, relations: Array<IntArray>, time: IntArray): Int {
        val adj = HashMap<Int, MutableList<Int>>().apply {
            for ((src, dst) in relations) {
                this[src] = getOrDefault(src, mutableListOf<Int>()).apply { 
                    add(dst) 
                }
            }
        }


        val maxTime = IntArray (n + 1) { -1 }
        fun dfs(src: Int): Int {
            if (maxTime[src] != -1) return maxTime[src]

            var res = time[src - 1]
            adj[src]?.forEach { nei ->
                res = maxOf(res, time[src - 1] + dfs(nei))
            }

            maxTime[src] = res
            return res
        }

        for (i in 1..n)
            dfs(i)
        
        return maxTime.max()!!
    }
}
