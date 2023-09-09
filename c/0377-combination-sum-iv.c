int combinationSum4(int* nums, int numsSize, int target) {
    uint64_t dp[target + 1]; // Using uint64_t to avoid overflow
    for (int i = 0; i <= target; i++) {
        dp[i] = 0;
    }

    dp[0] = 1;

    for (int i = 1; i <= target; i++) {
        for (int j = 0; j < numsSize; j++) {
            if (i - nums[j] >= 0) {
                dp[i] += dp[i - nums[j]];
            }
        }
    }

    return (int)dp[target];
}
