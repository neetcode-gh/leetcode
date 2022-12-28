class Solution {
	fun rob(nums: IntArray): Int {
        var rob = 0
        var notRob = 0
        nums.forEach {
            val currRob = notRob + it
            notRob = maxOf(notRob, rob)
            rob = currRob
        }

        return maxOf(rob, notRob)
    }
}