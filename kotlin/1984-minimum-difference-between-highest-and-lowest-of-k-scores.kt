class Solution {
    fun minimumDifference(nums: IntArray, k: Int): Int {
        nums.sort()
        var min = Integer.MAX_VALUE
        for(i in 0..nums.size-k) {
            min = minOf(min, nums[i+k-1]-nums[i])
        }
        return min
    }
}
