// iterative
class Solution {
    fun isPowerOfTwo(n: Int): Boolean {
        if (n == 0) return false
        if (n == 1) return true

        var n = n
        while (n % 2 == 0)
            n = n shr 1

        return n == 1
    }
}

// recursive
class Solution {
    fun isPowerOfTwo(n: Int): Boolean {
        if (n == 1) return true
        if (n <= 0 || n % 2 != 0) return false
        return isPowerOfTwo(n shr 1)
    }
}

// one line bit manipulation
class Solution {
    fun isPowerOfTwo(n: Int) = (n > 0) && (n and (n - 1) == 0)
}

// one line bit manipulation
class Solution {
    fun isPowerOfTwo(n: Int) = (n > 0 && ((1 shl 30) % n) == 0)
}
