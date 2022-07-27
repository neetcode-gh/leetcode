class Solution {
    fun maxProfit(prices: IntArray): Int {
        var buy = prices[0]
        var maxDiff = 0
        for (i in 1 until prices.size) {
            buy = buy.coerceAtMost(prices[i])
            maxDiff = maxDiff.coerceAtLeast(prices[i] - buy)
        }
        return maxDiff
    }
}
