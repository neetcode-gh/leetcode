class Solution {
    fun minOperations(nums: IntArray, x: Int): Int {
        var left = 0
        var max = -1
        var cur = 0
        var target = nums.sum()!! - x

        for (right in 0 until nums.size) {
            cur += nums[right]
            
            while (left <= right && cur > target) {
                cur -= nums[left++]
            } 

            if (cur == target) {
                max = maxOf(max, right - left + 1)
            }
        }

        return if (max == -1) -1 else nums.size - max
    }
}
