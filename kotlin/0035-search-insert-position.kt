class Solution {
    fun searchInsert(nums: IntArray, target: Int): Int {

        var l = 0
        var r = nums.lastIndex

        while(l <= r) {
            val mid  = (l + r) / 2
            if (target == nums[mid]) return mid
            if (target > nums[mid]) l = mid + 1
            else r = mid - 1
        }
        
        return l
    }
}
