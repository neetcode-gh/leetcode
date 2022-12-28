class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        var sold = 0, hold = -1000, rest = 0
        
        for i in 0...prices.count-1 {
            let prevSold = sold
            sold = hold + prices[i]
            hold = max(hold, rest - prices[i])
            rest = max(rest, prevSold)
        }
        return max(sold, rest)
    }
}