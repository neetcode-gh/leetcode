object Solution {
  def maxProfit(prices: Array[Int]): Int = {
    var left = 0
    var right = 1
    var maxProfit = 0
    while (right < prices.length) {
      val priceDiff = prices(right) - prices(left)
      if (priceDiff > 0) {
        maxProfit = maxProfit max priceDiff
      }
      else {
        left = right
      }
      right += 1
    }
    maxProfit
  }
}
