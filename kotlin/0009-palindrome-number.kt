class Solution {
    fun isPalindrome(x: Int): Boolean {
        if (x < 0) return false

        var reverse = 0
        var x2 = x
        while (x2 != 0) {
            reverse *= 10
            reverse += x2 % 10
            x2 /= 10
        }

        return reverse == x
    }
}
