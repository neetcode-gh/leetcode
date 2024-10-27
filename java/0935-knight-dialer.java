/*------------------------------
  Time Complexity: O(n)
  Space Complexity: O(1)
-------------------------------*/  
class Solution {
    public int knightDialer(int n) {
        if(n == 1)
            return 10;
        
        int MOD = (int)1e9 + 7;
        int[][] jumps = {
            {4, 6},
            {6, 8},
            {7, 9},
            {4, 8},
            {3, 9, 0},
            {},
            {1, 7, 0},
            {2, 6},
            {1, 3},
            {2, 4}
        };
        int[] dp = new int[10];
        Arrays.fill(dp, 1);
        for(int i = 0; i < n-1; i++){
            int[] next_dp = new int[10];
            for(int d = 0; d < 10; d++){
                for(int j: jumps[d])
                    next_dp[j] = (next_dp[j] + dp[d]) % MOD;    
            }
            dp = next_dp;
        }
        int res = 0;
        for(int no: dp)
            res = (res + no) % MOD;
        return res;        
    }
}
