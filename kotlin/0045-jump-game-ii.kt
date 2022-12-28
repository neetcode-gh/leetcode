class Solution {
    fun jump(nums: IntArray): Int {
        var left = 0
        var right = 0
        var res = 0
        
        while (right < nums.size - 1) {
            var maxJump = 0
            for (i in left..right) {
                maxJump = maxOf(maxJump, i + nums[i])
            }
            left = right + 1
            right = maxJump
            res += 1
        }
        return res
    }
}