class Solution {
    fun numSubarraysWithSum(nums: IntArray, goal: Int): Int {

        fun helper(x: Int): Int {
            if (x < 0) return 0

            var res = 0
            var l = 0
            var cur = 0
            for (r in 0 until nums.size) {
                cur += nums[r]

                while (cur > x)
                    cur -= nums[l++]

                res += (r - l + 1)
            }

            return res
        }

        return helper(goal) - helper(goal - 1)
    }
}
