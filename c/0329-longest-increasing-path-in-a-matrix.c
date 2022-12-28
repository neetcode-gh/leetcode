/*
Given an m x n integers matrix, return the length of the longest increasing path in matrix.
Time; O(n*m)
Space; O(n*m)

*/

int max(int a, int b) {
    return a>b?a:b;
}

int dfs(int** matrix, int** dp, int n, int m, int i, int j) {
    if (dp[i][j]!=0)
        return dp[i][j];
    int cpt=0;
    if (i>0 && matrix[i-1][j]>matrix[i][j])
        cpt = max(cpt, dfs(matrix, dp, n, m, i-1, j));
    if (j>0 && matrix[i][j-1]>matrix[i][j])
        cpt = max(cpt, dfs(matrix, dp, n, m, i, j-1));
    if (i<(n-1) && matrix[i+1][j]>matrix[i][j])
        cpt = max(cpt, dfs(matrix, dp, n, m, i+1, j));
    if (j<(m-1) && matrix[i][j+1]>matrix[i][j])
        cpt = max(cpt, dfs(matrix, dp, n, m, i, j+1));
    dp[i][j] = cpt+1;
    return cpt+1;
}

int longestIncreasingPath(int** matrix, int matrixSize, int* matrixColSize){
    int** dp = malloc(sizeof(int*)*matrixSize);
    int m = *matrixColSize, i, j;
    for (i=0; i<matrixSize; i++)
        dp[i] = calloc(m, sizeof(int));
    int ans = 0;
    for (i=0; i<matrixSize; i++) {
        for (j=0; j<m; j++) {
            ans = max(ans, dfs(matrix, dp, matrixSize, m, i, j));
        }
    }
    return ans;
}
