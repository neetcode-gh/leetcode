/*
    Let N = length of string s, M = length of dictionary
    Time: O(N * M)
    Space: O(N)
*/
class Solution {
    public int minExtraChar(String s, String[] dictionary) {
        int n = s.length();
        int[] dp = new int[n+1];
        
        Arrays.fill(dp, n);
        dp[0] = 0;
        
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < dictionary.length; ++j) {
                int len = dictionary[j].length();
                if (i >= len && s.substring(i - len, i).equals(dictionary[j])) {
                    dp[i] = Math.min(dp[i], dp[i - len]);
                }
            }
            dp[i] = Math.min(dp[i], dp[i - 1] + 1);
        }

        return dp[n];
    }
}