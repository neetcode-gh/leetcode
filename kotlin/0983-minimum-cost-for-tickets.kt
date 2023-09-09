/*
* DFS solution
*/
class Solution {

    fun mincostTicketsRecursive(days: IntArray, costs: IntArray): Int {
        val dp = mutableMapOf<Int, Int>()

        fun dfs(dayIndex: Int): Int {
            if (dayIndex == days.size) return 0
            if (dayIndex in dp) return dp[dayIndex]!!

            dp[dayIndex] = Int.MAX_VALUE
            for ((daysCount, cost) in intArrayOf(1, 7, 30).zip(costs)) {
                var nextDayIndex = dayIndex
                while (nextDayIndex < days.size && days[nextDayIndex] < days[dayIndex] + daysCount)
                    nextDayIndex++

                dp[dayIndex] = min(dp[dayIndex]!!, cost + dfs(nextDayIndex))
            }

            return dp[dayIndex]!!
        }

        return dfs(0)
    }
}

/*
* BFS Solution
*/
class Solution {

    fun mincostTickets(days: IntArray, costs: IntArray): Int {
        val dp = mutableMapOf<Int, Int>()

        for (dayIndex in days.indices.reversed()) {
            dp[dayIndex] = Int.MAX_VALUE

            for ((daysCount, cost) in intArrayOf(1, 7, 30).zip(costs)) {
                var nextDayIndex = dayIndex
                while (nextDayIndex < days.size && days[nextDayIndex] < days[dayIndex] + daysCount)
                    nextDayIndex++

                dp[dayIndex] = min(dp[dayIndex]!!, cost + dp.getOrDefault(nextDayIndex, 0))
            }
        }

        return dp[0]!!
    }
}
