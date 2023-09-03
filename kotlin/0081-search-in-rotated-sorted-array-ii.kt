class Solution {
    fun search(nums: IntArray, target: Int): Boolean {
        var l = 0
        var r = nums.lastIndex
        while (l <= r) {
            val m = l + (r - l) / 2
            if (nums[m] == target)
                return true
            if (nums[l] < nums[m]) {
                if (nums[l] <= target && nums[m] > target)
                    r = m - 1
                else
                    l = m + 1
            } else if (nums[l] > nums[m]) {
                if (nums[r] >= target && nums[m] < target)
                    l = m + 1
                else
                    r = m - 1
            } else {
                l++
            }
        }

        return false
    }
}
