class Solution {
    fun sortArrayByParity(nums: IntArray): IntArray {
        var odd = nums.lastIndex
        var i = 0

        while (i < odd) {
            if (nums[i] % 2 == 1) {
                val temp = nums[i]
                nums[i] = nums[odd]
                nums[odd] = temp
                odd--
            } else {
                i++
            }
        }

        return nums
    }
}
