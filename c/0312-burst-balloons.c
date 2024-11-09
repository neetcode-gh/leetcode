int max(int a, int b) {
    return (a > b) ? a : b;
}

int maxCoins(int* nums, int numsSize) {
    // Add padding of 1 to both ends of the array
    int n = numsSize + 2;
    int paddedNums[n];
    paddedNums[0] = paddedNums[n - 1] = 1;
    for (int i = 1; i < n - 1; i++) {
        paddedNums[i] = nums[i - 1];
    }
    
    // Create a 2D DP array to store the results
    int dp[n][n];
    memset(dp, 0, sizeof(dp));
    
    // Start dynamic programming process
    for (int len = 2; len < n; len++) {
        for (int left = 0; left < n - len; left++) {
            int right = left + len;
            for (int k = left + 1; k < right; k++) {
                dp[left][right] = max(dp[left][right], 
                                      paddedNums[left] * paddedNums[k] * paddedNums[right] + dp[left][k] + dp[k][right]);
            }
        }
    }
    
    return dp[0][n - 1];
}
