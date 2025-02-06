import java.util.Arrays;

class Solution {
    public int numDistinct(String s, String t) {
        int n = s.length();
        int m = t.length();
       
        
        int[] dp = new int[m + 1];
        dp[0] = 1; 
       
        for (int i = 0; i < n; i++) {
            for (int j = m; j > 0; j--) {
                if (s.charAt(i) == t.charAt(j - 1)) {
                    dp[j] += dp[j - 1]; 
                }
            }
        }
       
        return dp[m];
    }
}
