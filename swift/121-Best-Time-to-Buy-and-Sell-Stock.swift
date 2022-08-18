class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        var bestPrice = 0
        guard !prices.isEmpty else { return bestPrice }
        var curDay = prices[0]
        for i in 0..<prices.count {
            let price = prices[i]
            if curDay > price {
                curDay = price
            } else {
                if (price - curDay) > bestPrice {
                    bestPrice = price - curDay
                }
            }
        }
        return bestPrice
    }
}
