public class Solution {
    public int CoinChange(int[] coins, int amount) {
        var dp = Enumerable.Repeat(amount + 1, amount + 1).ToArray();
        
        dp[0] = 0;
        
        for(var a = 1; a <= amount; a++) {
            foreach(var c in coins) {
                if(a - c >= 0) {
                    dp[a] = Math.Min(dp[a], 1 + dp[a-c]);
                }
            }
        }
        
        return dp[amount] == amount + 1
            ? -1 
            : dp[amount];
    }
}