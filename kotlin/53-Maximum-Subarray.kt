class Solution {
    fun maxSubArray(nums: IntArray): Int {
        var sum = nums[0]
        var currsum = 0
        for (num in nums) {
            currsum = maxOf(currsum + num, num)
            sum = maxOf(currsum, sum)
        }
        return sum
    }
}
