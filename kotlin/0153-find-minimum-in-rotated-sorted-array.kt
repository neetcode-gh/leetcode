class Solution {
    fun findMin(nums: IntArray): Int {
        val n = nums.size
        if(n == 1) return nums[0]
        var low = 0
        var high = n - 1
        var min = Int.MIN_VALUE
        while(low < high) {
            var mid = low + (high - low)/2
            if(nums[mid] < nums[high]) {
                high = mid
            } else {
                low = mid + 1
            }
            min = nums[low]
        }
        return min
    }
}