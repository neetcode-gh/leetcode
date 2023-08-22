bool isInterleave(char *s1, char *s2, char *s3) {
    int len1 = strlen(s1);
    int len2 = strlen(s2);
    int len3 = strlen(s3);

    // If the lengths of the input strings don't add up correctly, return false
    if (len1 + len2 != len3) {
        return false;
    }

    // Create a 2D DP array to store the results of subproblems
    bool dp[len1 + 1][len2 + 1];
    memset(dp, false, sizeof(dp));

    // Base case: empty strings can always interleave to form an empty string
    dp[0][0] = true;

    // Fill in the DP array
    for (int i = 0; i <= len1; i++) {
        for (int j = 0; j <= len2; j++) {
            // If s1 matches the interleaved portion of s3
            if (i > 0 && s1[i - 1] == s3[i + j - 1]) {
                dp[i][j] = dp[i][j] || dp[i - 1][j];
            }
            // If s2 matches the interleaved portion of s3
            if (j > 0 && s2[j - 1] == s3[i + j - 1]) {
                dp[i][j] = dp[i][j] || dp[i][j - 1];
            }
        }
    }

    return dp[len1][len2];
}
