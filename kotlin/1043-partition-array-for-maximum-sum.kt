// Dp solution
class Solution {
    fun maxSumAfterPartitioning(arr: IntArray, k: Int): Int {
        val n = arr.size
        val dp = IntArray (k)
        dp[0] = arr[0]

        for (i in 1 until n) {
            var curMax = 0
            var maxAtI = 0
            for (j in i downTo (i - k + 1)) {
                if (j < 0) break

                curMax = maxOf(curMax, arr[j])

                val winLen = i - j + 1
                val curSum = curMax * winLen
                val subArrSum = if (j > 0) dp[(j - 1) % k] else dp[k - 1]

                maxAtI = maxOf(maxAtI, curSum + subArrSum)
            }

            dp[i % k] = maxAtI
        }

        return dp[(n - 1) % k]
    }
}

// recursion + memoization
class Solution {
    fun maxSumAfterPartitioning(arr: IntArray, k: Int): Int {
        val n = arr.size
        val dp = IntArray (n) { -1 }

        fun dfs(i: Int): Int {
            if (i == n) return 0
            if (dp[i] != -1) return dp[i]

            var curMax = 0
            var res = 0
            for (j in i until minOf(n, i + k)) {
                curMax = maxOf(curMax, arr[j])
                val winLen = j - i + 1
                res = maxOf(
                    res,
                    dfs(j + 1) + curMax * winLen
                )
            }

            dp[i] = res
            return res
        }

        return dfs(0)
    }
}
