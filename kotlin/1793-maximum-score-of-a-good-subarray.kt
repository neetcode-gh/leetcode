class Solution {
    fun maximumScore(nums: IntArray, k: Int): Int {
        var l = k
        var r = k
        var res = nums[k]
        var curMin = nums[k]

        while (l > 0 || r < nums.lastIndex) {
            var left = if (l > 0) nums[l - 1] else 0
            var right = if (r < nums.lastIndex) nums[r + 1] else 0

            if (left > right) {
                l--
                curMin = minOf(curMin, left)
            } else {
                r++
                curMin = minOf(curMin, right)
            }

            res = maxOf(res, curMin * (r - l + 1))
        }

        return res
    }
}
