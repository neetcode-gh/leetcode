class Solution {
    fun maxProfit(prices: IntArray): Int {
        var profit = 0
        for(i in 0 until prices.size-1){
            if(prices[i+1] > prices[i]) profit += (prices[i+1] - prices[i])
        }
        return profit
    }
}
