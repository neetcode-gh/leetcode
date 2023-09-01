#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

int greatestCommonDivisor(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int max(int a, int b) {
    return (a > b) ? a : b;
}

int func(int* nums, int op, int mask, int* dp, int** gcdValues, int m) {
    int n = m / 2;
    if (op > n) return 0;
    if (dp[mask] != -1) return dp[mask];

    for (int i = 0; i < m; i++) {
        if ((mask & (1 << i))) continue;
        for (int j = i + 1; j < m; j++) {
            if ((mask & (1 << j))) continue;

            int newMask = (1 << i) | (1 << j) | mask;
            int score = op * gcdValues[i][j] + func(nums, op + 1, newMask, dp, gcdValues, m);
            dp[mask] = max(dp[mask], score);
        }
    }
    return dp[mask];
}

int maxScore(int* nums, int numsSize) {
    int m = numsSize, n = numsSize / 2;
    int** gcdValues = (int**)malloc(m * sizeof(int*));
    for (int i = 0; i < m; i++) {
        gcdValues[i] = (int*)malloc(m * sizeof(int));
    }

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < m; j++) {
            gcdValues[i][j] = greatestCommonDivisor(nums[i], nums[j]);
        }
    }

    int* dp = (int*)malloc((1 << 14) * sizeof(int));
    for (int i = 0; i < (1 << 14); i++) {
        dp[i] = -1;
    }

    int result = func(nums, 1, 0, dp, gcdValues, m);

    for (int i = 0; i < m; i++) {
        free(gcdValues[i]);
    }
    free(gcdValues);
    free(dp);

    return result;
}
