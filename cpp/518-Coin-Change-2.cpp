class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<vector<int>> dp(coins.size() + 1, vector<int>(amount + 1));

        // loop with c(number of selected coin types) and a(amount) and the coin value is coins[c-1]
        for (int c = 0; c <= coins.size(); ++c) {
            int coinVal = c > 0 ? coins[c - 1] : 0;
            for (int a = 0; a <= amount; ++a) {
                if (a == 0) // amount is 0: only 1 way, which is selecting 0 coin
                    dp[c][a] = 1;
                else if (c == 0) // select 0 coin but amount is not 0: 0 way
                    dp[c][a] = 0;
                else if (coinVal > a) // selected coin(coins[c-1]) is bigger than amount: only can exclude
                    dp[c][a] = dp[c - 1][a];
                else // include + exclude
                    dp[c][a] = dp[c][a - coinVal] + dp[c - 1][a];
            }
        }
        // selecting all possible coins with total amount
        return dp[coins.size()][amount];
    }
};
