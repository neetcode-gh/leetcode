class Solution {
    fun countOrders(n: Int): Int {
        var slots = 2 * n
        var res = 1L
        val mod = 1_000_000_007

        while (slots > 0) {
            val choices = (slots * (slots - 1) % mod) / 2
            res = (res * choices) % mod
            slots -= 2
        }

        return res.toInt()
    }
}
