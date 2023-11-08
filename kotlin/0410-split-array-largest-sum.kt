class Solution {
    fun splitArray(nums: IntArray, k: Int): Int {

        fun canSplit(max: Int): Boolean {
            var subArrCnt = 1
            var curSum = 0
            for (n in nums) {
                curSum += n
                if (curSum > max) {
                    subArrCnt++
                    curSum = n
                }
            }
            return subArrCnt <= k
        }

        var l = nums.max()!!
        var r = nums.sum()!!
        var res = r
        while (l <= r) {
            val m = l + (r - l) / 2
            if (canSplit(m)) {
                res = m
                r = m - 1
            } else {
                l = m + 1
            }
        }

        return res
    }
}
