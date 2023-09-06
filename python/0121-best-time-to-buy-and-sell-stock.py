class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        
        profit = 0
        lowest = prices[0]
        
        for price in prices[1:]:
            if price < lowest:
                lowest = price
            elif price - lowest > profit:
                profit = price - lowest

        return profit
