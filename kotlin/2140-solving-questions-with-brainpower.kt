/*
* DFS/Recursion + Memoization
*/
class Solution {
    fun mostPoints(questions: Array<IntArray>): Long {
        val memo = LongArray(questions.size) { -1L }

        fun dfs(i: Int): Long {
            if (i >= questions.size)
                return 0
            if (memo[i] != -1L)
                return memo[i]
            
            memo[i] = maxOf(
                questions[i][0] + dfs(i + 1 + questions[i][1]),
                dfs(i + 1)
            )

            return memo[i]
        }

        return dfs(0)
    }
}

/*
* DP
*/
class Solution {
    fun mostPoints(q: Array<IntArray>): Long {
        val n = q.lastIndex
        val dp = LongArray(q.size)

        for (i in n downTo 0) {
            dp[i] = maxOf(
                if (i < n) dp[i + 1] else 0,
                q[i][0] + if (i + 1 + q[i][1] <= n) dp[i + 1 + q[i][1]] else 0
            )
        }

        return dp[0]
    }
}

/*
* DP with HashMap instead of Array for simpler code
*/
class Solution {
    fun mostPoints(q: Array<IntArray>): Long {
        val n = q.lastIndex
        val dp = HashMap<Int, Long>()

        for (i in n downTo 0) {
            dp[i] = maxOf(
                dp[i + 1] ?: 0L,
                q[i][0] + (dp[i + 1 + q[i][1]] ?: 0L)
            )
        }

        return dp[0] ?: 0L
    }
}
