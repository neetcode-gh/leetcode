import kotlin.math.max

class Solution {
    fun longestConsecutive(nums: IntArray): Int {
        if (nums.isEmpty()) return 0
        if (nums.size == 1) return 1
        val hashSet = HashSet<Int>()
        nums.forEach { hashSet.add(it) }
        var longestSize = 0
        var isNumberStartOfSequence: Boolean
        for (num in nums) {
            isNumberStartOfSequence = !hashSet.contains(num - 1)
            if (isNumberStartOfSequence) {
                var nextConsecutiveNumber = num + 1
                var currentSize = 1
                while (hashSet.contains(nextConsecutiveNumber)) {
                    nextConsecutiveNumber++
                    currentSize++
                }
                longestSize = max(longestSize, currentSize)
            }
        }
        return longestSize
    }
}