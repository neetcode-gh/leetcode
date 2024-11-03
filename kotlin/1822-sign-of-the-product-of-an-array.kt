class Solution {
    fun arraySign(nums: IntArray): Int {
        var res = 1
        for (n in nums){
            if (n == 0)
                return 0
            if (n < 0)
                res *= -1
        }
        return if (res > 0) 1 else -1
    }
}
