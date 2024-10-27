class Solution {
    fun minimumOneBitOperations(n: Int): Int {
        if (n == 0) return 0

        var k = 0
        while (2 p k <= n) 
            k++
        k -= 1

        return (2 p (k + 1)) - 1 - minimumOneBitOperations((2 p k) xor n)
    }

    infix fun Int.p(k: Int) = Math.pow(this.toDouble(), k.toDouble()).toInt()
}
