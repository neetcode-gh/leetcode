// recursion time O(logn)
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        if (n == 1) return true
        if (n <= 0 || n % 4 != 0) return false
        return isPowerOfFour(n / 4)
    }
}

// bit manipulation time O(1)
class Solution {
    fun isPowerOfFour(n: Int) = n > 0 && (n and (n - 1) == 0) && (n and 0x55555555) != 0
}
