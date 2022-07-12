// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
class Solution {
    fun maxProfit(prices: IntArray): Int {
        var maxProfit:Int = 0; var buy:Int = prices[0]
        for (sell in prices) {
            if (sell < buy) { buy = sell }
            val profit = sell - buy
            maxProfit = maxOf(maxProfit, profit)
        }
        return maxProfit
    }
}
