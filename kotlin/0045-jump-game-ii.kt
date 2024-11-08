/*
* O(n) BFS
*/
class Solution {
    fun jump(nums: IntArray): Int {
        var left = 0
        var right = 0
        var res = 0
        
        while (right < nums.size - 1) {
            var maxJump = 0
            for (i in left..right) {
                maxJump = maxOf(maxJump, i + nums[i])
            }
            left = right + 1
            right = maxJump
            res += 1
        }
        return res
    }
}

/*
* O(N^2) DP + memoization
*/
class Solution {
    fun jump(nums: IntArray): Int {
        val dp = IntArray(nums.size) { 10001 }

        fun jump(i: Int): Int {
            if (i == nums.lastIndex)
                return 0
            if (dp[i] != 10001)
                return dp[i]

            for (steps in 1..nums[i]) {
                if (i + steps <= nums.lastIndex) {
                    dp[i] = minOf(
                        dp[i],
                        1 + jump(i + steps)
                    )
                }
            }

            return dp[i]
        }
        
        return jump(0)
    }
}
