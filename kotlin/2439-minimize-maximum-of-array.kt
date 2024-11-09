class Solution {
    fun minimizeArrayValue(nums: IntArray): Int {
        var res = nums[0].toDouble()
        var sum = nums[0].toDouble()

        for (i in 1..nums.lastIndex) {
            sum += nums[i].toDouble()
            var current = Math.ceil(sum / (i + 1))
            res = maxOf(res, current)
        }

        return res.toInt()
    }
