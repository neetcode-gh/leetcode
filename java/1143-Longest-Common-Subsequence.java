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
      dp[i][j] = Math.max(LCS(s1, s2, i + 1, j, dp), LCS(s1, s2, i, j + 1, dp));
      return dp[i][j];
    }
  }
}
