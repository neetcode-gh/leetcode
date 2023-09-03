//memoized version

class Solution {

    public int longestCommonSubsequence(String text1, String text2) {
        int[][] dp = new int[text1.length()][text2.length()];
        return LCS(text1, text2, 0, 0, dp);
    }

    public int LCS(String s1, String s2, int i, int j, int[][] dp) {
        if (i >= s1.length() || j >= s2.length()) return 0; else if (
            dp[i][j] != 0
        ) return dp[i][j]; else if (s1.charAt(i) == s2.charAt(j)) return (
            1 + LCS(s1, s2, i + 1, j + 1, dp)
        ); else {
            dp[i][j] =
                Math.max(LCS(s1, s2, i + 1, j, dp), LCS(s1, s2, i, j + 1, dp));
            return dp[i][j];
        }
    }
}

// Iterative version
class Solution {
    
    public int longestCommonSubsequence(String text1, String text2) {
        int[][] dp = new int[text1.length() + 1][text2.length() + 1];    

        for (int i = text1.length() - 1; i >= 0; i--) {
            for (int j = text2.length() - 1; j >= 0; j--) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    dp[i][j] = 1 + dp[i + 1][j + 1];
                } else {
                    dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j]);
                }
            }
        }

        return dp[0][0];
    }
}