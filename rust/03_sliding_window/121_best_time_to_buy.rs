use super::std::cmp;
impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let mut l = 0;
        let mut r = 1;
        let mut max_profit = 0;
        while r < prices.len() {
            if prices[l] < prices[r] {
                let profit = prices[r] - prices[l];
                max_profit = cmp::max(profit, max_profit)
            } else {
                l = r
            }
            r += 1
        }
        max_profit
    }
}
