class Solution {
    fun minOperations(_nums: IntArray): Int {
        val length = _nums.size
        val nums =  _nums.toSet().toIntArray().sorted()
        var res = length
        var right = 0

        for (left in 0 until length) {
            while (right < nums.size && nums[right] < nums[left] + length)
                right++
            res = minOf(res, length - (right - left))
        }

        return res
    }
}
