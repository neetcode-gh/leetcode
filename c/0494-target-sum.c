int findTargetSumWays(int* nums, int numsSize, int target) {
    int sum = 0;
    for (int i = 0; i < numsSize; i++) {
        sum += nums[i];
    }
    if (target > sum || target < -sum) {
        return 0;
    }

    int n = numsSize;
    int dp[n + 1][2 * sum + 1];
    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= 2 * sum; j++) {
            dp[i][j] = 0;
        }
    }
    dp[0][sum] = 1;

    for (int i = 0; i < n; i++) {
        for (int j = nums[i]; j <= 2 * sum - nums[i]; j++) {
            if (dp[i][j]) {
                dp[i + 1][j + nums[i]] += dp[i][j];
                dp[i + 1][j - nums[i]] += dp[i][j];
            }
        }
    }

    return dp[n][sum + target];
}
