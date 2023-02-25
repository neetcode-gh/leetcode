package kotlin

class Solution {
    fun findDuplicate(nums: IntArray): Int {
        var slow = 0
        var slow2 = 0
        var fast = 0
        // detect the cycle
        while (true) {
            slow = nums[slow]
            fast = nums[nums[fast]]
            if (slow == fast) break
        }
        // get the first value at the beginning of the cycle
        while (true) {
            slow2 = nums[slow2]
            slow = nums[slow]
            if (slow2 == slow) return slow
        }
    }
}