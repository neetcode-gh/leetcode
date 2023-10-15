/*      Top-Down Approach
-------------------------------------
  Time Complexity: O(n*min(n,m))
  Space Complexity: O(n*min(n,m))
------------------------------------*/  
class Solution {
    Map<String, Integer> memo;
    int MOD = (int)1e9+7;
    public int numWays(int steps, int arrLen){
        memo = new HashMap<>();
        return dfs(0, steps, arrLen);
    }
    private int dfs(int i, int steps, int n){
        String pos = i + "," + steps;
        if(memo.containsKey(pos))
            return memo.get(pos);
        if(steps == 0 && i == 0)
            return 1;
        if(i < 0 || i > n-1 || steps == 0)
            return 0;
        
        long left = dfs(i-1, steps-1, n);
        long stay = dfs(i, steps-1, n);
        long right = dfs(i+1, steps-1, n);
        int res = (int)((left + stay + right)%MOD);
        memo.put(pos, res);
        return res;       
    }
}

/*      Bottom-Up Approach
------------------------------------
  Time Complexity: O(n*min(n,m))
  Space Complexity: O(n*min(n,m))
-----------------------------------*/  
class Solution {
    public int numWays(int steps, int arrLen) {
        int MOD = (int)1e9+7;
        arrLen = Math.min(arrLen, steps);
        int[][] dp = new int[steps + 1][arrLen];
        
        dp[0][0] = 1;

        for (int step = 1; step <= steps; step++) {
            for (int pos = 0; pos < arrLen; pos++) {
                dp[step][pos] = dp[step - 1][pos];
                
                if (pos - 1 >= 0) {
                    dp[step][pos] = (dp[step][pos] + dp[step - 1][pos - 1]) % MOD;
                }
                if (pos + 1 < arrLen) {
                    dp[step][pos] = (dp[step][pos] + dp[step - 1][pos + 1]) % MOD;
                }
            }
        }

        return dp[steps][0];
    }
}
