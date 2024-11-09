int max(int a, int b) {
    return a > b ? a : b;
}

int deleteAndEarn(int* nums, int numsSize) {
    if (numsSize == 0) return 0;

    int max_num = nums[0];
    for (int i = 0; i < numsSize; i++) {
        max_num = max(max_num, nums[i]);
    }

    int freq[max_num + 1];
    for (int i = 0; i <= max_num; i++) {
        freq[i] = 0;
    }

    for (int i = 0; i < numsSize; i++) {
        freq[nums[i]] += nums[i];
    }

    int dp[max_num + 1];
    dp[0] = 0;
    dp[1] = freq[1];

    for (int i = 2; i <= max_num; i++) {
        dp[i] = max(dp[i - 1], dp[i - 2] + freq[i]);
    }

    return dp[max_num];
}
