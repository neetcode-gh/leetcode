long long mostPoints(int** questions, int questionsSize, int* questionsColSize) {
    int n = questionsSize;
    long long* dp = (long long*)malloc((n + 1) * sizeof(long long));
    
    for (int i = 0; i <= n; i++) {
        dp[i] = 0;
    }
    
    for (int i = n - 1; i >= 0; i--) {
        int points = questions[i][0];
        int jump = questions[i][1];
        dp[i] = (points + dp[(jump + i + 1) < n ? (jump + i + 1) : n]) > dp[i + 1] ? (points + dp[(jump + i + 1) < n ? (jump + i + 1) : n]) : dp[i + 1];
    }
    
    long long result = dp[0];
    free(dp);
    return result;
}
