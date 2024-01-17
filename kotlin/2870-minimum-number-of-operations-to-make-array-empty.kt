class Solution {
    fun minOperations(nums: IntArray): Int {
        val count = nums.asIterable().groupingBy { it }.eachCount()

        var res = 0
        for (c in count.values) {
            if (c == 1) return -1
            res += (c / 3) + if (c % 3 > 0) 1 else 0 // "Ceil" function
        }

        return res
    }
}
