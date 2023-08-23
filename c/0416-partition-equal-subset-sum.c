bool canPartition(int* nums, int numsSize) {
    int totalSum = 0;
    for (int i = 0; i < numsSize; i++) {
        totalSum += nums[i];
    }
    
    if (totalSum % 2 != 0) {
        return false; // If the total sum is odd, we cannot partition equally
    }
    
    int targetSum = totalSum / 2;
    bool dp[targetSum + 1]; // dp[i] represents whether a subset with sum i is possible
    
    // Initialize dp array
    for (int i = 0; i <= targetSum; i++) {
        dp[i] = false;
    }
    dp[0] = true; // Empty subset can always achieve sum 0
    
    // Dynamic programming approach
    for (int i = 0; i < numsSize; i++) {
        for (int j = targetSum; j >= nums[i]; j--) {
            dp[j] = dp[j] || dp[j - nums[i]];
        }
    }
    
    return dp[targetSum];
}
