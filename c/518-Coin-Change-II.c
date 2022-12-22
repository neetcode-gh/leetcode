/*
You are given an integer array coins representing coins of different
denominations and an integer amount representing a total amount of money.
Return the number of combinations that make up that amount. 

Space: O(n) where n is the amount
Time: O(np) where p is the number of coins
*/

int change(int amount, int* coins, int coinsSize){
    if (coinsSize==0) { // Take care of extreme cases
        return amount==0;
    }
    int* dp = calloc((amount+1), sizeof(int));
    dp[0] = 1; // One way to give zero
    for (int i=0; i<coinsSize; i++) {
        for (int j=coins[i]; j<=amount; j++) {
            dp[j] += dp[j-coins[i]];
        }
    }
    int ans = dp[amount];
    free(dp);
    return ans;
}
