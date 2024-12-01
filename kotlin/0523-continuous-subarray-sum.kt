class Solution {
    fun checkSubarraySum(nums: IntArray, k: Int): Boolean {
        val hm = hashMapOf(0 to -1)
        var prefix = 0
        nums.forEachIndexed {i, num ->
            prefix += num
            val remainder = prefix % k
            if(remainder !in hm) hm[remainder] = i
            else if(i - hm[remainder]!! >= 2) return true
        }
        return false
    }
}
