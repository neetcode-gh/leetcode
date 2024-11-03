int min(int a, int b) {
    return a < b ? a : b;
}

int max(int a, int b) {
    return a > b ? a : b;
}

int mincostTickets(int* days, int daysSize, int* costs, int costsSize) {
    int k = 0;
    int dp[366];
    
    for (int i = 0; i <= 365; i++) {
        dp[i] = 0;
    }

    for (int i = 1; i <= 365; i++) {
        dp[i] = dp[i - 1];
        if (i == days[k]) {
            dp[i] = min(dp[i - 1] + costs[0],
                        min(dp[max(0, i - 7)] + costs[1],
                            dp[max(0, i - 30)] + costs[2]));
            if (k < daysSize - 1) {
                k++;
            }
        }
    }

    return dp[365];
}
