// rolling dp O(1) space
class Solution {
    fun validPartition(nums: IntArray): Boolean {
        val n = nums.size
        val dp = booleanArrayOf(false, false, false, true)

        for (i in 0 until n) {
            dp[i % 4] = false
            if (i > 0 && nums[i - 1] == nums[i]) 
                dp[i % 4] = dp[i % 4] or dp[(i + 2) % 4]
            if (i > 1 && nums[i - 1] == nums[i] && nums[i - 2] == nums[i]) 
                dp[i % 4] = dp[i % 4] or dp[(i + 1) % 4]
            if (i > 1 && nums[i - 1] + 1 == nums[i] && nums[i - 2] + 2 == nums[i]) 
                dp[i % 4] = dp[i % 4] or dp[(i + 1) % 4]
        }

        return dp[(n - 1) % 4]
    }
}

//dp O(n) space
class Solution {
    fun validPartition(nums: IntArray): Boolean {
        val n = nums.size
        val dp = BooleanArray (n + 1).apply { this[0] = true }

        for (i in 2..n) {
            dp[i] = dp[i] or (nums[i - 1] == nums[i - 2] && dp[i - 2])
            dp[i] = dp[i] or (i > 2 && nums[i - 1] == nums[i - 2] && nums[i - 1] == nums[i - 3] && dp[i - 3])
            dp[i] = dp[i] or (i > 2 && nums[i - 1] - 1 == nums[i - 2] && nums[i - 1] - 2 == nums[i - 3] && dp[i - 3])
        }

        return dp[n]
    }
}

//recursion
class Solution {
    fun validPartition(nums: IntArray): Boolean {
        val n = nums.size
        val dp = IntArray (n) { -1 }

        fun dfs(i: Int): Int {
            if (i == n) return 1
            if (dp[i] != -1) return dp[i]

            if (i + 1 < n && nums[i] == nums[i + 1])
                if (dfs(i + 2) == 1) return 1
            if (i + 2 < n && nums[i] == nums[i + 1] && nums[i] == nums[i + 2])
                if (dfs(i + 3) == 1) return 1
            if (i + 2 < n && nums[i] + 1 == nums[i + 1] && nums[i] + 2 == nums[i + 2])
                if (dfs(i + 3) == 1) return 1

            dp[i] = 0
            return dp[i]
        }

        return dfs(0) == 1
    }
}
