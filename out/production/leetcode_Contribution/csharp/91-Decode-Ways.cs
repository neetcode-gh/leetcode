public class Solution {
    public int NumDecodings(string s) {
        List<int> dp = Enumerable.Repeat(1, s.Length + 1).ToList();
        
        for(var i = s.Length - 1; i >= 0; i--) {
            if (s[i] == '0') 
                dp[i] = 0;
            else 
                dp[i] = dp[i + 1];

            if (i + 1 < s.Length && (
                s[i] == '1' || 
                (s[i] == '2' && "0123456".Contains(s[i + 1]))
            ))
                dp[i] += dp[i + 2];
        }
        
        return dp[0];
    }
}