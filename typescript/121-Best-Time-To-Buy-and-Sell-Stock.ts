function maxProfit(prices: number[]): number {
  let max = 0;
  let l = 0;
  let r = 1;

  while (r < prices.length) {
    if (prices[l] < prices[r]) {
      let profit = prices[r] - prices[l];
      if (profit > max) {
        max = profit;
      }
    } else {
      l = r;
    }
    r++;
  }

  return max;
}
