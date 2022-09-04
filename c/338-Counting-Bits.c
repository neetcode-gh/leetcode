/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* countBits(int n, int* returnSize){
    // Initialize array of size n + 1
    int arraySize = n + 1;
    *returnSize = arraySize;
    int *dp = (int *)malloc(sizeof(int)*arraySize);
    memset(dp, 0, arraySize*sizeof(dp[0]));
    int offset = 1;
    
    // Perform dp
    for (int i = 1; i <= n; i++) {
        if (offset * 2 == i) {
            offset = i;
        }
        dp[i] = 1 + dp[i - offset];
    }
    return dp;
}