class Solution {
    fun numSubseq(nums: IntArray, target: Int): Int {
        nums.sort()
        val mod = 1000000000 + 7

        val pow = IntArray(nums.size)
        pow[0] = 1
        for (i in 0 until nums.size - 1)
            pow[i + 1] = pow[i] * 2 % mod

        var left = 0
        var right = nums.lastIndex
        var res = 0
        while (left <= right) {
            if (nums[left] + nums[right] > target) {
                right--
            } else {
                res = (res + pow[right - left]) % mod
                left++
            }
        }

        return res
    }
}
