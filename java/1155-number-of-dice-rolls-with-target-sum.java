/*        Top Down Method
-----------------------------------*/
class Solution {
    int MOD = (int)1e9 + 7;
    Map<String, Integer> memo;

    public int numRollsToTarget(int n, int k, int target) {
        memo = new HashMap<>();
        return count(n, k, target);
    }
    
    private int count(int n, int k, int target){
        String currState = n + "," + target;
        if(n == 0)
            return (target == 0)? 1: 0;
        if(memo.containsKey(currState))
            return memo.get(currState);

        int res = 0;
        for(int val = 1; val < k + 1; val++)
            res = (res + count(n - 1, k, target - val)) % MOD;
        memo.put(currState, res);
        return res;    
    }
}

/*           Bottom Up Method
-----------------------------------------*/
class Solution {
    public int numRollsToTarget(int n, int k, int target) {
        int[] dp = new int[target + 1];
        dp[0] = 1;
        int MOD = (int) 1e9 + 7;

        for(int dice = 0; dice < n; dice++){
            int[] next_dp = new int[target + 1];

            for(int val = 1; val < k + 1; val++){
                for(int total = val; total < target + 1; total++){
                    next_dp[total] = (next_dp[total] + dp[total - val]) % MOD;
                }
            }
            dp = next_dp;
        }
        return dp[target];
    }
}
