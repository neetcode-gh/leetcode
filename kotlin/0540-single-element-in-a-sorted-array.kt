class Solution {
    fun singleNonDuplicate(nums: IntArray): Int {

        var left = 0
        var right = nums.lastIndex

        while(left < right) {
            val mid = (left + right) / 2
            if(mid % 2 == 0 && nums[mid] == nums[mid + 1] ||
                mid % 2 == 1 && nums[mid] == nums[mid - 1]) {
                left = mid + 1
            } else {
                right = mid
            }
        }     

        return nums[left]
    }
}
