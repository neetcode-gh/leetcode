class Solution {
    fun rotate(nums: IntArray, k: Int): Unit {

        fun reverse(from: Int, to: Int) {
            var f = from
            var t = to
            while (f < t) {
                nums[f] = nums[t].also { nums[t--] = nums[f++] }
            }
        }

        val modK = (k % nums.size)
        reverse(0, nums.lastIndex)
        reverse(0, modK - 1)
        reverse(modK, nums.lastIndex)
    }
}
