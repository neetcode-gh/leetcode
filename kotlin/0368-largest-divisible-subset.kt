// DP top-down tabulation
class Solution {
    fun largestDivisibleSubset(nums: IntArray): List<Int> {
        val n = nums.size
        nums.sort()
        val dp = nums
            .map { listOf(it) }
            .toTypedArray()
        var res = listOf<Int>()

        for (i in n - 1 downTo 0) {
            for (j in i + 1 until n) {
                if (nums[j] % nums[i] == 0) {
                    val temp = listOf(nums[i]) + dp[j]
                    dp[i] = if (temp.size > dp[i].size) temp else dp[i]
                }
            }

            res = if (dp[i].size > res.size) dp[i] else res
        }

        return res
    }
}

// recursion + memoization
class Solution {
    fun largestDivisibleSubset(nums: IntArray): List<Int> {
        val n = nums.size
        nums.sort()
        val dp = HashMap<Int, List<Int>>()

        fun dfs(i: Int): List<Int> {
            if (i == n) return listOf()
            dp[i]?.let { return it }

            var res = listOf(nums[i])
            for (j in i + 1 until n) {
                if (nums[j] % nums[i] == 0) {
                    val temp = listOf(nums[i]) + dfs(j)
                    if (temp.size > res.size)
                        res = temp
                }
            }

            dp[i] = res
            return res
        }

        var res = listOf<Int>()
        for (i in nums.indices) {
            val temp = dfs(i)
            if (temp.size > res.size)
                res = temp
        }

        return res
    }
}
