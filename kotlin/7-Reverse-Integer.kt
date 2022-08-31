class Solution {
    fun reverse(x: Int): Int {
        val MIN = Int.MIN_VALUE
        val MAX = Int.MAX_VALUE
        
        var res = 0
        var value = x
        while (value != 0) {
            var digit = value % 10
            value /= 10
            
            if (res > MAX / 10 || (res == MAX / 10 && digit >= MAX % 10)) {
                return 0
            }
            if (res < MIN / 10 || (res == MIN / 10 && digit <= MIN % 10)) {
                return 0
            }
            res = (res * 10) + digit 
        }
        return res
    }
}