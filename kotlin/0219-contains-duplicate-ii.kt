class Solution {
    fun containsNearbyDuplicate(nums: IntArray, k: Int): Boolean {
        
        val hs = HashSet<Int>()
        var left = 0
        var right = 0

        while (right < nums.size) {

            if (right - left > k) {
                hs.remove(nums[left])
                left++
            }

            if (nums[right] in hs) return true

            hs.add(nums[right])
            right++
        }

        return false
    }
}
