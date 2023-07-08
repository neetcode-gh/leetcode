// Subset Sum DP solution (Recursive DP solution for java exceeds time limit)

/*
 * Calculate for the sum of all the potential positive numbers (targetSum)
 *
 * Formula: targetSum = (∑nums + target) / 2 
 * (must be even otherwise there's no valid answer so return 0)
 *
 * Return all the possible ways to get the targetSum
 * since the remaining numbers would be negative we just need to account 
 * for the sum of the positive numbers (targetSum)
 *
 * The formula for the targetSum was derived as follows:
 * P = potential positive numbers
 * N = potential negative numbers
 * ∑P - ∑N = target
 * ∑P - ∑N + ∑nums = target + ∑nums
 * ∑P - ∑N + (∑P + ∑N) = target + ∑nums       
 * ∑P + ∑P = target + ∑nums
 * 2 * ∑P = target + ∑nums
 * (2 * ∑P) / 2 = (target + ∑nums) / 2
 * ∑P = (target + ∑nums) / 2
 */

class Solution {
    public int subsetSum(int[] nums, int targetSum) {
        int[] dp = new int[targetSum + 1];
        dp[0] = 1;

        for (int n : nums) {
            for (int i = targetSum; i >= n; i--) {
                dp[i] += dp[i - n]; 
            }
        }

        return dp[targetSum];
    }
  
    public int findTargetSumWays(int[] nums, int target) {
        int targetSum = 0;

        for (int n : nums) {
            targetSum += n;
        }

        return (targetSum < target 
                    || targetSum + target < 0
                    || (targetSum + target) % 2 != 0) 
               ? 0
               : subsetSum(nums, (targetSum + target) / 2);
    }
}
