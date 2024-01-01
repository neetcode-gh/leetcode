class Solution {
    fun isUgly(_n: Int): Boolean {
        if (_n <= 0) return false

        var n = _n
        for (p in listOf(2, 3, 5)) {
            while (n % p == 0)
                n /= p
        }

        return n == 1
    }
}
