//Brute-force solution (accepted)

class Solution {

    public int findTargetSumWays(int[] nums, int target) {
        return helper(nums, target, nums.length, 0);
    }

    public int helper(int[] nums, int target, int n, int temp) {
        if (n == 0) {
            if (target == temp) return 1; else return 0;
        } else {
            return (
                helper(nums, target - nums[n - 1], n - 1, temp) +
                helper(nums, target + nums[n - 1], n - 1, temp)
            );
        }
    }
}
