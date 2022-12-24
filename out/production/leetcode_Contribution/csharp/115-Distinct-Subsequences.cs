public class Solution {
    public int NumDistinct(string s, string t) {
        var nS = s.Length;
        var nT = t.Length;

        if (nS < nT) return 0;

        var dp = new int[nS + 1, nT + 1];

        for (int i = 0; i <= nS; i++) {
            dp[i, 0] = 1;
        }

        for (int i = 1; i <= nS; i++) {
            var sIndex = i - 1;
            for (int j = 1; j <= nT; j++) {
                var tIndex = j - 1;
                if (s[sIndex] == t[tIndex]) {
                    dp[i, j] = dp[i - 1, j - 1] + dp[i - 1, j];
                } else {
                    dp[i, j] = dp[i - 1, j];
                }
            }
        }

        return dp[nS, nT];
    }
}
