class Solution {
    fun maxFrequency(nums: IntArray, k: Int): Int {
        nums.sort()

        var res = 0
        var total = 0L
        var left = 0
        var right = 0

        while (right < nums.size) {
            total += nums[right]

            if (nums[right] * (right - left + 1) > total + k)
                total -= nums[left++]

            res = maxOf(
                res,
                (right - left + 1)
            )
            
            right++
        }

        return res
    }
}
