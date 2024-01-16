class Solution {
    fun jobScheduling(s: IntArray, e: IntArray, p: IntArray): Int {
        val dp = IntArray (s.size) { -1 }

        val intervals = s.mapIndexed { i, v -> 
            intArrayOf(v, e[i], p[i]) 
        }.sortedWith(compareBy({ it[0] }, { it[1] }))

        fun dfs(i: Int): Int {
            if (i == intervals.size || i == -1) return 0
            if (dp[i] != -1) return dp[i]

            // bisect
            var l = i
            var r = intervals.lastIndex
            var res = -1
            while (l <= r) {
                val m = (r + l) / 2
                if (intervals[m][0] >= intervals[i][1]) {
                    res = m
                    r = m - 1
                } else {
                    l = m + 1
                }
            }

            dp[i] = maxOf(
                dfs(i + 1), // dont include
                intervals[i][2] + dfs(res) //include
            )
            
            return dp[i]
        }

        return dfs(0)
    }
}
