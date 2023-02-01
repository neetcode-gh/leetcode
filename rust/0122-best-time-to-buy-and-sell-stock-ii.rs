impl Solution {
            pub fn max_profit(prices: Vec<i32>) -> i32 {
                let mut buy = i32::MAX;
                let mut sell = 0;
                for p in prices {
                    buy = std::cmp::min(buy, p - sell);
                    sell = std::cmp::max(sell, p - buy);
                }
        
                return sell
            }
        }
