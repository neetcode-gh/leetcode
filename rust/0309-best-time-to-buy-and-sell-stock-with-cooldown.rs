impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let mut p1 = 0;
        let mut p2 = 0;

        for x in 1..=prices.len()-1 {
            let temp = p1;
            p1 = std::cmp::max(p1+prices[x]-prices[x-1], p2);
            p2 = std::cmp::max(temp, p2);
        }

        return std::cmp::max(p1, p2)
    }
}
