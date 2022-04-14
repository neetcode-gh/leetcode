class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1); // minimum coin combinations for 0 to amount, set default max value as amount+1(which is impossible to make)
        dp[0] = 0; // base case: if amount is 0, 0 coins
        for (int a = 1; a <= amount; ++a) {
            for (int c : coins) {
                if (a - c >= 0) // possible to try
                    // min of (current min combination, using one for this coin and min of remainder)
                    dp[a] = min(dp[a], 1 + dp[a - c]);
            }
        }
        return dp[amount] != amount + 1 ? dp[amount] : -1;
    }
};
