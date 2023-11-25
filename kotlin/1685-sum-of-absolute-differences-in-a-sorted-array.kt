class Solution {
    fun getSumAbsoluteDifferences(nums: IntArray): IntArray {
        val totalSum = nums.sum()!!
        val n = nums.size
        var leftSum = 0
        val res = IntArray (nums.size)

        for ((i, num) in nums.withIndex()) {
            val rightSum = totalSum - num - leftSum
            res[i] = i * num - leftSum + rightSum - (n - i - 1) * num
            leftSum += num
        }

        return res
    }
}
