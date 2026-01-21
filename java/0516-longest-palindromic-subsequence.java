class Solution {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        int[][] dp = new int[n + 1][n + 1];
        int res = 0;
        
        for (int i = 0; i < n; i++) {
            for (int j = n - 1; j >= i; j--) {
                if (s.charAt(i) == s.charAt(j)) {
                    dp[i][j] = (i == j) ? 1 : 2;
                    if (i - 1 >= 0 && j + 1 < n) {
                        dp[i][j] += dp[i - 1][j + 1];
                    }
                } else {
                    dp[i][j] = dp[i][j + 1];
                    if (i - 1 >= 0) {
                        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j]);
                    }
                }
                res = Math.max(res, dp[i][j]);
            }
        }
        return res;
    }
}

// Alternate solution
class Solution {
    public int longestPalindromeSubseq(String s) {
        int l = s.length();
        String rev_s = new StringBuilder(s).reverse().toString();
        int[][] dp = new int[l + 1][l + 1];

        for (int i = 0; i <= l; i++) {
            for (int j = 0; j <= l; j++) {
                dp[i][j] = -1;
            }
        }

        return memoization(s, rev_s, l, l, dp);       
    }

        private int memoization(String s, String rev_s, int m, int n, int[][] dp) {
        if (m == 0 || n == 0) {
            return 0;
        }
        if (dp[m][n] != -1) {
            return dp[m][n];
        }
        if (s.charAt(m - 1) == rev_s.charAt(n - 1)) {
            dp[m][n] = 1 + memoization(s, rev_s, m - 1, n - 1, dp);
        } else {
            dp[m][n] = Math.max(memoization(s, rev_s, m - 1, n, dp), memoization(s, rev_s, m, n - 1, dp));
        }
        return dp[m][n];
    }
}

// Alternate solution - bottom up dynamic programming
class Solution {
    public int longestPalindromeSubseq(String s) {
        int l = s.length();
        String rev_s = new StringBuilder(s).reverse().toString();
        int[][] dp = new int[l + 1][l + 1];

        for (int i = 1; i <= l; i++) {
            for (int j = 1; j <= l; j++) {
                if (s.charAt(i - 1) == rev_s.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[l][l];
    }
}
