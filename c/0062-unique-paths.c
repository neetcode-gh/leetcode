int dp[105][105] = {};
    
int ways(int posX, int posY, int m, int n)
{
    if(posX == m-1 && posY == n-1) return 1;

    if(posX >= m || posY >= n) return 0;

    if(dp[posX][posY] != -1) return dp[posX][posY];

    int right = ways(posX + 1, posY, m, n); // moves to right corner.

    int bottom = ways(posX, posY + 1, m, n);// moves to bottom corner.

    dp[posX][posY] = right + bottom;

    return dp[posX][posY];
}

int uniquePaths(int m, int n) {
    
    // Initializing the dp array with -1 value.
    for(int i = 0; i < 105; i++){
        for(int j = 0; j < 105; j++) dp[i][j] = -1;
    }

    int ans = ways(0, 0, m, n);

    return ans;
}