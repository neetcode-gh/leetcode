class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int curMax = 0, curMin = 0;
        int globMax = nums[0], globMin = nums[0];
        int total = 0;
        for (int n : nums) {
            curMax = Math.max(curMax + n, n);
            curMin = Math.min(curMin + n, n);
            total += n;
            globMax = Math.max(curMax, globMax);
            globMin = Math.min(curMin, globMin);
        }
        return globMax > 0 ? Math.max(globMax, total - globMin) : globMax;
    }
}
