class Solution {
    fun subarraySum(nums: IntArray, k: Int): Int {
        val hm = hashMapOf(0 to 1)
        var res = 0
        var sum = 0
        nums.forEach {
            sum += it
            val prefix = sum - k
            res += hm.getOrDefault(prefix, 0)
            hm[sum] = hm.getOrDefault(sum, 0) + 1
        }
        return res
    }
}
