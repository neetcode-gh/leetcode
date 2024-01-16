class Solution {
    fun maxProductDifference(nums: IntArray): Int {
        var max1 = Integer.MIN_VALUE
        var max2 = Integer.MIN_VALUE
        var min1 = Integer.MAX_VALUE
        var min2 = Integer.MAX_VALUE
        for (n in nums) {
            if (n > max1) {
                max2 = max1
                max1 = n
            } else {
                max2 = maxOf(max2, n)
            }

            if (n < min1) {
                min2 = min1
                min1 = n
            } else {
                min2 = minOf(min2, n)
            }
        }

        return max1 * max2 - min1 * min2
    }
}
