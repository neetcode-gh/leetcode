// Recursion + Memoization
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

// Top-down DP
class Solution {
    fun jobScheduling(sT: IntArray, eT: IntArray, p: IntArray): Int {
        val jobs = sT.indices
            .map { intArrayOf(sT[it], eT[it], p[it]) }
            .sortedWith(compareBy({ it[0] }, { it[1] }))

        val n = jobs.size
        val last = n - 1
        val dp = IntArray (n)

        for (i in last downTo 0) {
            var j = -1
            var l = i
            var r = last
            while (l <= r) {
                val m = (l + r) / 2
                if (jobs[m][0] >= jobs[i][1]) {
                    j = m
                    r = m - 1
                } else {
                    l = m + 1
                }
            }

            dp[i] = maxOf(
                jobs[i][2] + (if (j != -1) dp[j] else 0),
                if (i + 1 < n) dp[i + 1] else 0
            )
        }

        return dp[0]
    }
}

//Bottom-up DP 
class Solution {
    fun jobScheduling(sT: IntArray, eT: IntArray, p: IntArray): Int {
        val jobs = sT.indices
            .map { intArrayOf(sT[it], eT[it], p[it]) }
            .sortedWith(compareBy({ it[1] }, { it[0] }))

        val n = jobs.size
        val dp = IntArray (n)

        for (i in 0 until n) {
            var l = 0
            var r = i - 1
            var j = -1
            while (l <= r) {
                val m = (l + r) / 2
                if (jobs[m][1] <= jobs[i][0]) {
                    j = m
                    l = m + 1
                } else {
                    r = m - 1
                }
            }

            dp[i] = maxOf(
                jobs[i][2] + if (j >= 0) dp[j] else 0,
                if (i - 1 >= 0) dp[i - 1] else 0
            )
        }

        return dp[n - 1]
    }
}
