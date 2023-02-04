class Solution {
    fun pivotIndex(nums: IntArray): Int {
        var leftSum = 0
        var rightSum = 0
        for(num in nums) rightSum += num
        for(i in nums.indices){
            if(leftSum == rightSum - nums[i]) return i
            leftSum += nums[i]
        }
        return -1
    }
}
