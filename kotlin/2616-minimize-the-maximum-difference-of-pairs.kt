class Solution {
    fun minimizeMax(nums: IntArray, p: Int): Int {
        if (p == 0) return 0

        val n = nums.size
        nums.sort()

        fun good(x: Int): Boolean {
            var i = 0
            var count = 0
            while (i < n - 1) {
                if ((nums[i + 1] - nums[i]) <= x) {
                    count++
                    i += 2
                } else {
                    i++
                }  
                if (count == p) return true
            }
            return false
        }

        var l = 0
        var r = 1000000000
        while (l < r) {
            val m = l + (r - l) / 2
            if (good(m)) {
                r = m
            } else {
                l = m + 1
            }
        }

        return l
    }
}
