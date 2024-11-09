class Solution {
    fun findTargetSumWays(nums: IntArray, target: Int): Int {
        val memo = HashMap<String, Int>()

        fun dfs(i: Int, sum: Int): Int {
            if (i == nums.size)
                return if (sum == target) 1 else 0
            val key = "$i:$sum"
            if (key in memo)
                return memo[key]!!
            memo[key] = dfs(i + 1, sum + nums[i]) + 
                dfs(i + 1, sum - nums[i])
            return memo[key]!!
        }

        return dfs(0, 0)
    }
}
