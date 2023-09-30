// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {
  int maxProfit(List<int> prices) {
    var maxProfit = 0;
    var buyDay = 0;

    for (var sellDay = 1; sellDay < prices.length; sellDay++) {
      if (prices[buyDay] > prices[sellDay]) {
        buyDay = sellDay;
      }
      var profit = prices[sellDay] - prices[buyDay];
      maxProfit = max(maxProfit, profit);
    }

    return maxProfit;
  }
}
