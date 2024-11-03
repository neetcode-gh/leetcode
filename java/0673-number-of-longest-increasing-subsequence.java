class Solution {
    public int findNumberOfLIS(int[] nums) {
        int[][] dp = new int[nums.length][2];
        int LISLength = 0;
        int LISCount = 0;
        for (int i = nums.length - 1; i >= 0; i--) {
            int maxLength = 1;
            int maxCount = 1;
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] > nums[i]) {
                    int length = dp[j][0];
                    int count = dp[j][1];
                    if (length + 1 > maxLength) {
                        maxLength = length + 1;
                        maxCount = count;
                    } else if (length + 1 == maxLength) {
                        maxCount += count;
                    }
                }
            }
            if (maxLength > LISLength) {
                LISLength = maxLength;
                LISCount = maxCount;
            } else if (maxLength == LISLength) {
                LISCount += maxCount;
            }
            dp[i] = new int[] { maxLength, maxCount };
        }
        return LISCount;
    }
}
