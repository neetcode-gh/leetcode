/*
Return the fewest number of coins that you need to make up that amount.
Time; O(nm) where n is the amount desired and m the number of coins
Space: O(n)
*/

int min(unsigned int a, int b) {
    return a<b?a:b;
}

int coinChange(int* coins, int coinsSize, int amount){
    if (amount==0)
        return 0;
    int dp[amount +1];
    for (int i=1; i<=amount; i++)
        dp[i] = UINT_MAX;
    dp[0] = 0;
    for (int i=1; i<=amount; i++) {
        unsigned int cpt = UINT_MAX;
        for (int j=0; j<coinsSize; j++) {
            if (i>=coins[j] && cpt>dp[i-coins[j]])
                cpt = dp[i-coins[j]];
        }
        if (cpt!=UINT_MAX)
            dp[i] = cpt+1;
    }
    return dp[amount]==UINT_MAX?-1:dp[amount];
}
