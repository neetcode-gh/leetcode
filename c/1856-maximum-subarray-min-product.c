#define MOD 1000000007

long long max(long long a, long long b) {
    return a > b ? a : b;
}

int maxSumMinProduct(int* nums, int numsSize) {
    long long res = 0;
    long long dp[numsSize + 1];
    long long st[numsSize + 1];

    dp[0] = 0;
    for (int i = 0; i < numsSize; ++i) {
        dp[i + 1] = dp[i] + nums[i];
    }

    int st_top = -1;

    for (int i = 0; i <= numsSize; ++i) {
        while (st_top >= 0 && (i == numsSize || nums[st[st_top]] > nums[i])) {
            int j = st[st_top--];
            res = max(res, (long long)nums[j] * (dp[i] - dp[st_top < 0 ? 0 : st[st_top] + 1]));
        }
        st[++st_top] = i;
    }

    return (int)(res % MOD);
}
