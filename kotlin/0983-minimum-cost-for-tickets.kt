/*
* DP without a DFS
*/
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val dp = IntArray(days.size) {-1}
        val zipped = intArrayOf(1,7,30).zip(costs)

        for (i in days.lastIndex downTo 0) {
            dp[i] = Integer.MAX_VALUE
            for ((day, cost) in zipped) {
                var next = i
                while (next < days.size && days[next] < days[i] + day) next++
                dp[i] = minOf(
                    dp[i], 
                    cost + if(next < days.size) dp[next] else 0
                )
            }
        }
        
        return dp[0]
    }
}

/*
* DFS + cache
*/
class Solution {
    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val cache = IntArray(days.size) {-1}
        val zipped = intArrayOf(1,7,30).zip(costs)

        fun dfs(i: Int): Int {
            if (i == days.size)
                return 0

            if (cache[i] != -1)
                return cache[i]

            cache[i] = Integer.MAX_VALUE
            for ((day, cost) in zipped) {
                var next = i
                while (next < days.size && days[next] < days[i] + day)
                    next++
                cache[i] = minOf(cache[i], cost + dfs(next))
            }

            return cache[i]
        }

        return dfs(0)
    }
}
