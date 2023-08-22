/*
* Binary Search
*/
class Solution {
    fun mySqrt(x: Int): Int {
        var left = 0L
        var right = x.toLong()
        var res = 0L

        while (left <= right) {
            val mid = left + (right - left) / 2
            val midSq = mid * mid
            
            if (midSq > x) {
                right = mid - 1
            } else if (midSq < x) {
                left = mid + 1
                res = mid
            } else {
                return mid.toInt()
            }
        }

        return res.toInt()
    }
}

/*
* Newton's method
*/
class Solution {
    fun mySqrt(x: Int): Int {
        if (x == 0) return 0

        var i = x.toLong()
        while (i > x / i) {
            i = (i + x / i) / 2
        }

        return i.toInt()
    }
}
