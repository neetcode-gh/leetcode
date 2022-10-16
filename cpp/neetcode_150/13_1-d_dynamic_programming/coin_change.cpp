/*
    Given array of coins & an amount, return fewest coins to make that amount
    Ex. coins = [1,2,5], amount = 11 -> 3, $11 = $5 + $5 + $1

    Compute all min counts for amounts up to i, "simulate" use of a coin

    Time: O(m x n) -> m = # of coins, n = amount
    Space: O(n)
*/

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        
        for (int i = 1; i < amount + 1; i++) {
            for (int j = 0; j < coins.size(); j++) {
                if (i - coins[j] >= 0) {
                    dp[i] = min(dp[i], 1 + dp[i - coins[j]]);
                }
            }
        }
        
        if (dp[amount] == amount + 1) {
            return -1;
        }
        return dp[amount];
    }
};
