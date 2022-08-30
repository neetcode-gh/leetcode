class Solution {
    func maxProfit(_ prices: [Int]) -> Int {
        var res = 0
        var l = 0
        var r = 0
        
        for r in 1..<prices.count {
            if prices[r] < prices[l] {
                l = r
            }
            res = max(res, prices[r] - prices[l])
        }
        
        return res
    }
}
