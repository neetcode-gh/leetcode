class Solution {
    fun findCheapestPrice(n: Int, flights: Array<IntArray>, src: Int, dst: Int, k: Int): Int {
        var cost = IntArray(n){ Int.MAX_VALUE }
        cost[src] = 0

        for (i in 0..k) {
            val temp = cost.clone()

            for (flight in flights) {
                val (u, v, w) = flight

                if (cost[u] != Int.MAX_VALUE)
                    temp[v] = Math.min(temp[v], cost[u] + w)
            }

            cost = temp
        }

        return if (cost[dst] == Int.MAX_VALUE) -1 else cost[dst]
    }
}