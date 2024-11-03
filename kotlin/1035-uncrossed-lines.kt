/*
* Top down DP with optimized space
*/
class Solution {
    fun maxUncrossedLines(nums1: IntArray, nums2: IntArray): Int {
        var prev = IntArray(nums2.size + 1)

        for (i in 0 until nums1.size) {
            val dp = IntArray(nums2.size + 1)

            for (j in 0 until nums2.size) {
                if (nums1[i] == nums2[j]) {
                    dp[j + 1] = 1 + prev[j]
                } else {
                    dp[j + 1] = maxOf(
                        dp[j],
                        prev[j + 1]
                    )
                }
            }

            prev = dp
        }

        return prev[nums2.size]
    }
}

/*
* Top down DP
*/
class Solution {
    fun maxUncrossedLines(nums1: IntArray, nums2: IntArray): Int {
        val dp = Array(nums1.size + 1) { IntArray(nums2.size + 1) }

        for (i in 0 until nums1.size) {
            for (j in 0 until nums2.size) {
                if (nums1[i] == nums2[j]) {
                    dp[i + 1][j + 1] = 1 + dp[i][j]
                } else {
                    dp[i + 1][j + 1] = maxOf(
                        dp[i + 1][j],
                        dp[i][j + 1]
                    )
                }
            }
        }

        return dp[nums1.size][nums2.size]
    }
}

/*
* Recursion/dfs + memoization
*/
class Solution {
    fun maxUncrossedLines(nums1: IntArray, nums2: IntArray): Int {
        val memo = Array(nums1.size) { IntArray(nums2.size) {-1} }

        fun dfs(i: Int, j: Int): Int {
            if (i == nums1.size || j == nums2.size)
                return 0
            if (memo[i][j] != -1)
                return memo[i][j]

            memo[i][j] = 0

            if (nums1[i] == nums2[j]) {
                memo[i][j] = 1 + dfs(i + 1, j + 1)

            } else {
                memo[i][j] += maxOf(
                    dfs(i + 1, j),
                    dfs(i, j + 1)
                )
            }

            return memo[i][j]
        }

        return dfs(0, 0)
    }
}

/*
* Bottom up DP
*/
class Solution {
    fun maxUncrossedLines(nums1: IntArray, nums2: IntArray): Int {
        val dp = Array(nums1.size + 1) { IntArray(nums2.size + 1) }

        for (i in nums1.lastIndex downTo 0) {
            for (j in nums2.lastIndex downTo 0) {
                if (nums1[i] == nums2[j]) {
                    dp[i][j] = 1 + dp[i + 1][j + 1]
                } else {
                    dp[i][j] = maxOf(
                        dp[i + 1][j],
                        dp[i][j + 1]
                    )
                }
            }
        }

        return dp[0][0]
    }
}
