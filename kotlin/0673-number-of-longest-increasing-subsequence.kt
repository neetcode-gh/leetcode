/*
* DFS + memoization solution
*/
class Solution {
    fun findNumberOfLIS(nums: IntArray): Int {
        val memo = HashMap<Int, Pair<Int, Int>>()  
        var lisLen = 0
        var lisCount = 0

        fun dfs(i: Int): Pair<Int, Int> {
            if (i in memo)
                return memo[i]!!

            var maxLen = 1
            var maxCount = 1
            for (j in i+1 until nums.size) {
                if (nums[i] < nums[j]) {
                    val (curLen, curCount) = dfs(j)
                    if (curLen + 1 > maxLen) {
                        maxLen = curLen + 1
                        maxCount = curCount
                    } else if (curLen + 1 == maxLen) {
                        maxCount += curCount
                    }
                }
            }

            if (maxLen > lisLen) {
                lisLen = maxLen
                lisCount = maxCount
            } else if (maxLen == lisLen) {
                lisCount += maxCount
            }

            memo[i] = (maxLen to maxCount)
            return memo[i]!!
        }

        for (i in nums.indices)
            dfs(i)
        
        return lisCount
    }
}

/*
* DP solution
*/
class Solution {
    fun findNumberOfLIS(nums: IntArray): Int {
        val lis = IntArray(nums.size) {1}
        val count = IntArray(nums.size)

        var lisLen = 0
        var lisCount = 0
        for (i in nums.size-1 downTo 0) {
            var maxLen = 1
            var maxCount = 1

            for (j in i+1 until nums.size) {
                if (nums[i] < nums[j]) {
                    val curLen = lis[j]
                    val curCount = count[j]
                    if (curLen + 1 > maxLen) {
                        maxLen = curLen + 1
                        maxCount = curCount
                    } else if (curLen + 1 == maxLen) {
                        maxCount += curCount
                    }
                }
            }

            if (maxLen > lisLen) {
                lisLen = maxLen
                lisCount = maxCount
            } else if (maxLen == lisLen) {
                lisCount += maxCount
            }

            lis[i] = maxLen
            count[i] = maxCount
        }
        
        return lisCount
    }
}
