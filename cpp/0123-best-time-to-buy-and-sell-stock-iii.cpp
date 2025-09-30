class Solution {
public:
    int maxProfitFromDay(int day, int canBuy, int transactionsRemaining,
                         vector<int>& prices,
                         vector<vector<vector<int>>>& dp) {
        int n = prices.size();
        
        // Base cases
        if (day == n || transactionsRemaining == 0) return 0;
        
        // Return already computed state
        if (dp[day][canBuy][transactionsRemaining] != -1) {
            return dp[day][canBuy][transactionsRemaining];
        }
        
        int profit = 0;
        if (canBuy) {
            // Option 1: Buy the stock today
            int buyToday = -prices[day] + maxProfitFromDay(day + 1, 0, transactionsRemaining, prices, dp);
            // Option 2: Skip buying today
            int skipToday = maxProfitFromDay(day + 1, 1, transactionsRemaining, prices, dp);
            profit = max(buyToday, skipToday);
        } else {
            // Option 1: Sell the stock today
            int sellToday = prices[day] + maxProfitFromDay(day + 1, 1, transactionsRemaining - 1, prices, dp);
            // Option 2: Skip selling today
            int skipToday = maxProfitFromDay(day + 1, 0, transactionsRemaining, prices, dp);
            profit = max(sellToday, skipToday);
        }
        
        return dp[day][canBuy][transactionsRemaining] = profit;
    }
    
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        // 3D DP: dp[day][canBuy][transactionsRemaining]
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(2, vector<int>(3, -1)));
        
        // Start at day 0, with option to buy, and 2 transactions allowed
        return maxProfitFromDay(0, 1, 2, prices, dp);
    }
};

