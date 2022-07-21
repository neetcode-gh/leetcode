class Solution {

  int mod = 1000000007;

  public int numRollsToTarget(int n, int k, int target) {
    if (target > n * k || target < n) return 0;
    if (n == 1) return target < n ? 0 : 1;
    int[][] dp = new int[n + 1][target + 1];
    return helper(n, k, target, dp);
  }

  public int helper(int n, int k, int target, int[][] dp) {
    if (target > n * k || target < n) return 0;
    if (target == 0 && n == 0) return 1;
    if (dp[n][target] != 0) return dp[n][target];
    int sum = 0;
    for (int i = 1; i <= k; i++) {
      sum = (sum + helper(n - 1, k, target - i, dp)) % mod;
    }
    return dp[n][target] = sum;
  }
}
