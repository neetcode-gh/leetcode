class Solution {
    fun findDuplicates(nums: IntArray): List<Int> {
        val res = mutableListOf<Int> ()

        for (n in nums) {
            val n = if (n < 0) -n else n
            if (nums[n - 1] < 0) res.add(n)
            nums[n - 1] *= -1
        }
        
        return res
    }
}
