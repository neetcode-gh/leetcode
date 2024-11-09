class Solution {
    fun findPeakElement(nums: IntArray): Int {
        var left = 0
        var right = nums.lastIndex
        var mid = -1

        while(left <= right) {
            mid = left + (right - left) / 2       
            if(mid > 0 && nums[mid] < nums[mid - 1])
                right = mid - 1
            else if(mid < nums.lastIndex && nums[mid] < nums[mid + 1])
                left = mid + 1
            else
                break
        }

        return mid
    }
}
