class Solution {
    fun findInMountainArray(target: Int, mountainArr: MountainArray): Int {
        var l = 1
        var r = mountainArr.length() - 2
        var peak = -1
        while (l <= r) {
            val m = (l + r) / 2
            val left = mountainArr.get(m - 1)
            val mid = mountainArr.get(m)
            val right = mountainArr.get(m + 1)

            if (left < mid && mid < right) {
                l = m + 1
            } else if (left > mid && mid > right) {
                r = m - 1
            } else {
                peak = m
                break
            }
        }

        l = 0
        r = peak
        while (l <= r) {
            val m = (l + r) / 2
            val value = mountainArr.get(m)
            if (value < target)
                l = m + 1
            else if (value > target)
                r = m - 1
            else
                return m
        }

        l = peak
        r = mountainArr.length() - 1
        while (l <= r) {
            val m = (l + r) / 2
            val value = mountainArr.get(m)
            if (value < target)
                r = m - 1
            else if (value > target)
                l = m + 1
            else
                return m
        }

        return -1
    }
}
