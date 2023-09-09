class Solution {
  
  /*       Tabulation Method
      --------------------------
      T = Target, N = nums.length
      Time complexity: O(T⋅N)
      Space complexity: O(T)
  */
  
    public int combinationSum4(int[] nums, int target) {
        int[] dp = new int[target+1];
        dp[0] = 1;

        for(int currSum = 1; currSum < dp.length; currSum++){
            for(int no : nums){
                if(currSum - no >= 0){
                    dp[currSum] += dp[currSum - no];
                }
            }
        }
        return dp[target];
    }

/*        Memoization Method
      --------------------------
      T = Target, N = nums.length
      Time complexity: O(T⋅N)
      Space complexity: O(T) + Recursive Stack
*/
  
    public int combinationSum4(int[] nums, int target) {
        HashMap<Integer, Integer> memo = new HashMap<>();
        return helper(nums, target, memo);
    }

    private int helper(int[] nums, int t, HashMap<Integer, Integer> memo){
        if(t == 0)
            return 1;
        if(t < 0)
            return 0;
        if(memo.containsKey(t))
            return memo.get(t);

        int count = 0;
        for(int no : nums){
            count += helper(nums, t - no);
        }
        memo.put(t, count);
        return count;        
    }
}
