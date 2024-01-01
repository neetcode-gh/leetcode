class Solution {
    fun buyChoco(prices: IntArray, money: Int): Int {
        var min1 = Integer.MAX_VALUE
        var min2 = Integer.MAX_VALUE

        for (p in prices) {
            if (p < min1) {
                min2 = min1
                min1 = p
            } else {
                min2 = minOf(min2, p)
            }
        }

        val left = money - (min1 + min2)
        return if (left >= 0) left else money
    }
}
