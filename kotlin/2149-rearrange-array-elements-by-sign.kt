class Solution {
    fun rearrangeArray(nums: IntArray): IntArray {
        var pos = 0
        var neg = 1
        val res = IntArray (nums.size)

        for (num in nums) {
            if (num > 0) {
                res[pos] = num
                pos += 2
            } else {
                res[neg] = num
                neg += 2
            }
        }

        return res
    }

}
