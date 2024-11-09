class Solution {
    fun isPerfectSquare(num: Int): Boolean {
        var l = 1L
        var r = num.toLong()
        while (l <= r) {
            val m = (l + r) / 2
            if (m * m > num)
                r = m - 1
            else if (m * m < num)
                l = m + 1
            else
                return true
        }
        return false
    }
}
