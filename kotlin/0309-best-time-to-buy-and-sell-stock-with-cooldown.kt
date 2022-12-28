class Solution {
    fun maxProfit(prices: IntArray): Int {
        var sold = 0
        var hold = Int.MIN_VALUE
        var rest = 0
        
        for (i in 0..prices.size-1) {
            val prevSold = sold
            sold = hold + prices[i]
            hold = maxOf(hold, rest - prices[i])
            rest = maxOf(rest, prevSold)
        }
        return maxOf(sold, rest)
    }
}