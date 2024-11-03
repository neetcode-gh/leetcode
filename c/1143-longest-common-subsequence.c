int longestCommonSubsequence(char * text1, char * text2) {
    int m = strlen(text1);
    int n = strlen(text2);
    
    int dp[m + 1][n + 1]; // dp[i][j] represents the length of the LCS of text1[0...i-1] and text2[0...j-1]
    
    // Initialize the first row and column to 0
    for (int i = 0; i <= m; i++) {
        dp[i][0] = 0;
    }
    for (int j = 0; j <= n; j++) {
        dp[0][j] = 0;
    }
    
    // Dynamic programming approach to fill the dp array
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = (dp[i - 1][j] > dp[i][j - 1]) ? dp[i - 1][j] : dp[i][j - 1];
            }
        }
    }
    
    return dp[m][n];
}
