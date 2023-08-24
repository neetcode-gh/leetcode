int countGoodStrings(int low, int high, int zero, int one) {
    int mod = 1000000007;
    int* dp = (int*)malloc((high + 1) * sizeof(int));
    
    dp[0] = 1;
    int res = 0;
    
    for (int i = 1; i <= high; ++i) {
        dp[i] = 0;
        
        if (i >= zero) {
            dp[i] = (dp[i] + dp[i - zero]) % mod;
        }
        
        if (i >= one) {
            dp[i] = (dp[i] + dp[i - one]) % mod;
        }
        
        if (i >= low) {
            res = (res + dp[i]) % mod;
        }
    }
    
    free(dp);
    return res;
}
