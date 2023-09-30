class Solution {
    fun isMonotonic(nums: IntArray): Boolean {
        if (nums[nums.lastIndex] - nums[0] < 0)
            nums.reverse()
        
        for (i in 0 until nums.lastIndex) {
            if (!(nums[i] <= nums[i + 1]))
                return false
        }

        return true
    }
}
