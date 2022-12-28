class Solution {
    fun isHappy(n: Int): Boolean {
        var slow = n
        var fast = sumSquareDigits(n)
        
        while (slow != fast) {
            fast = sumSquareDigits(sumSquareDigits(fast))
            slow = sumSquareDigits(slow)
        }
        return fast == 1
    }
    
    fun sumSquareDigits(n: Int): Int {
        var result = 0
        var num = n
        while (num != 0) {
            val digit = num % 10
            result += digit * digit
            num /= 10
        }
        return result
    }
}