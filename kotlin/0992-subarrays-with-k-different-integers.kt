class Solution {
    fun subarraysWithKDistinct(nums: IntArray, k: Int): Int {
        val count = HashMap<Int, Int>()
        var res = 0
        
        var l = 0
        var m = 0
        for (r in 0 until nums.size) {
            count[nums[r]] = (count[nums[r]] ?: 0) + 1
            
            while (count.size > k) {
                count[nums[m]] = (count[nums[m]] ?: 0) - 1
                if ((count[nums[m]] ?: 0) == 0) count.remove(nums[m])
                m++
                l = m
            }

            while ((count[nums[m]] ?: 0) > 1) {
                count[nums[m]] = (count[nums[m]] ?: 0) - 1
                m++
            }
            
            if (count.size == k) res += (m - l + 1)
        }

        return res
    }
}
