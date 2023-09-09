class Solution {
    fun removeDuplicates(nums: IntArray): Int {

        var left = 0
        var right = 0

        while (right < nums.size) {
            var count = 1
            while(right + 1 < nums.size && nums[right] == nums[right + 1]) {
                count++
                right++
            }
            for(i in 0 until minOf(2, count)) {
                nums[left] = nums[right]
                left++
            }
            right++
        }

        return left
    }
}
