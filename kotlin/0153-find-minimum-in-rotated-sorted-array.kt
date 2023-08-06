class Solution {
    fun findMin(nums: IntArray): Int {
        var l = 0
        var r = nums.lastIndex
        var res = nums[0]
        
        while (l <= r) {
            var mid = l + (r - l) / 2
            if (nums[l] < nums[r]) {
                res = minOf(res, nums[l])
                break
            } 
            
            val m = l + (r - l) / 2
            res = minOf(res, nums[m])
            if (nums[m] >= nums[l])
                l = mid + 1
            else
                r = m - 1
        }
        
        return res
    }
}
