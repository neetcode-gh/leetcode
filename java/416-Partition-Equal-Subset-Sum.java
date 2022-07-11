class Solution {

  public boolean canPartition(int[] nums) {
    int sum = 0;
    for (int num : nums) {
      sum += num;
    }
    if (sum % 2 != 0) return false;
    int target = sum / 2;
    boolean[][] dp = new boolean[nums.length + 1][target + 1];
    int n = nums.length;
    for (int i = 0; i <= n; i++) {
      for (int j = 0; j <= target; j++) {
        if (i == 0 || j == 0) {
          if (i == 0) dp[i][j] = false; else if (j == 0) dp[i][j] = true;
        } else if (j >= nums[i - 1]) {
          dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    return dp[n][target];
  }
}
