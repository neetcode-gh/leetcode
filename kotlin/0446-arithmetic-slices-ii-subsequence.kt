// dp
class Solution {
    fun numberOfArithmeticSlices(nums: IntArray): Int {
        var res = 0
        val dp = HashMap<Pair<Int, Long>, Int>()

        for (i in 0 until nums.size) {
            for (j in 0 until i) {
                val d = nums[i].toLong() - nums[j]
                dp[i to d] = (dp[i to d] ?: 0) + 1 + (dp[j to d] ?: 0)
                res += (dp[j to d] ?: 0)
            }
        }

        return res
    }
}

// recursion + memoization
class Solution {
    fun numberOfArithmeticSlices(nums: IntArray): Int {
        val dp = HashMap<String, Int>()
        val count = HashMap<Long, MutableList<Int>>()

        nums.forEachIndexed { i, n ->
            count.getOrPut(n.toLong()) { mutableListOf() }.apply { add(i) }
        }
        
        fun dfs(i: Int, d: Long, s: Int): Int {
            dp["$i:$d:$s"]?.let { return it }

            var res = if (s > 2) 1 else 0
            count[nums[i] + d]?.forEach { j ->
                if (j > i) res += dfs(j, d, s + 1)
            }

            dp["$i:$d:$s"] = res
            return res
        }

        var res = 0
        for (i in 0 until nums.size) {
            for (j in i + 1 until nums.size)
                res += dfs(j, nums[j].toLong() - nums[i], 2)
        }

        return res
    }
}
