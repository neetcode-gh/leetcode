// Dynammic Programming - Tabulation
// Time Complexity (n * amount) | Space Complexity (amount) where n is the length of coins
class Solution {
    public int change(int amount, int[] coins) {
        
        int n = coins.length;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, 0);
        
        // if amount is 0, there is only 1 way of making change (no money)
        dp[0] = 1;
        
        for (int coin: coins){
            for (int i = 1; i <= amount; i++){
                if (coin <= i){
                    dp[i] = dp[i] + dp[i - coin];
                }
            }
        }
    
        return dp[amount];      
        
    }
}