public class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int res = 0;
        int n = nums.length;

        Map<Long, Integer>[] dp = new HashMap[n];
        for (int i = 0; i < n; i++) {
            dp[i] = new HashMap<>();
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long diff = (long) nums[i] - (long) nums[j];
                dp[i].put(diff, dp[i].getOrDefault(diff, 0) + 1 + dp[j].getOrDefault(diff, 0));
                res += dp[j].getOrDefault(diff, 0);
            }
        }

        return res;
    }
}
