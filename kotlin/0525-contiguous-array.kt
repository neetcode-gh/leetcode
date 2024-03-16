class Solution {
    fun findMaxLength(nums: IntArray): Int {
        var zero = 0
        var one = 0
        var res = 0

        val diffIndex = HashMap<Int, Int> ()

        for ((i, n) in nums.withIndex()) {
            if (n == 0)
                zero++
            else
                one++
            if (one - zero !in diffIndex)
                diffIndex[one - zero] = i

            if (one == zero) {
                res = one + zero
            } else {
                val idx = diffIndex[one - zero] ?: 0
                res = maxOf(res, i - idx)
            }
        }

        return res
    }
}
