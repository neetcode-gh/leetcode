class Solution {
public:
    int solve(const vector<int> &nums, vector<vector<int>> &dp, int l, int r) {
        if (l > r)
            return 0;
        if (dp[l][r] > 0)
            return dp[l][r];
        for (int i = l; i <= r; ++i) {
            // burst nums[i] the last
            // score from current coin: nums[i] * excluded left * excluded right
            int coins = nums[i] * nums[l - 1] * nums[r + 1];
            // score from remainders: recursive maximum for range [l ~ i-1] and [i+1 ~ r]
            coins += solve(nums, dp, l, i - 1) + solve(nums, dp, i + 1, r);
            dp[l][r] = max(dp[l][r], coins);
        }
        return dp[l][r];
    }

    int maxCoins(vector<int>& nums) {
        // to simplify the solution, add 1 to both end to process out-of-bound *1 condition
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        vector<vector<int>> dp(nums.size(), vector<int>(nums.size(), 0));
        // exclude virtual left end and right end
        return solve(nums, dp, 1, nums.size() - 2);
    }
};
