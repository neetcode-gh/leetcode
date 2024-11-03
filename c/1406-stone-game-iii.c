char *stoneGameIII(int* stoneValue, int stoneValueSize) {
    int n = stoneValueSize;
    int dp[n];
    for (int i = 0; i < n; ++i) {
        dp[i] = -1e9;
    }
    
    for (int i = n - 1; i >= 0; --i) {
        int take = 0;
        for (int k = 0; k < 3 && i + k < n; ++k) {
            take += stoneValue[i + k];
            dp[i] = (dp[i] > take - ((i + k + 1 < n) ? dp[i + k + 1] : 0)) ? dp[i] : take - ((i + k + 1 < n) ? dp[i + k + 1] : 0);
        }
    }
    
    char *result = (char *)malloc(6 * sizeof(char)); // "Alice" or "Bob" or "Tie" plus null terminator
    if (dp[0] > 0) {
        strcpy(result, "Alice");
    } else if (dp[0] < 0) {
        strcpy(result, "Bob");
    } else {
        strcpy(result, "Tie");
    }
    return result;
}
