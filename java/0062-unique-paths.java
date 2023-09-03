class Solution {

    // Dynamic programming: TC = O(m*n), SC = O(m*n)
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];

        // Fill out last row
        for (int j = 0; j < n; j++) {
            dp[m - 1][j] = 1;
        }

        // Fill out last column
        for (int i = 0; i < m; i++) {
            dp[i][n - 1] = 1;
        }

        for (int i = m - 2; i >= 0; i--) {
            for (int j = n - 2; j >= 0; j--) {
                dp[i][j] = dp[i][j + 1] + dp[i + 1][j];
            }
        }
        return dp[0][0];
    }

    // Dynamic programming: TC = O(m*n), SC = O(min(m,n))
    public int uniquePaths2(int m, int n) {
        if (m <= 0 || n <= 0) return 0;

        int[] dp = new int[n];
        for (int i = 0; i < n; i++)
            dp[i] = 1;

        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[j] += dp[j - 1];

        return dp[n - 1];
    }

    // Combinatorics: TC = O(min(m,n)), SC = O(1)
    // result = C(m + n, n) = (m + n)! / (m! * n!)
    public int uniquePaths3(int m, int n) {
        if (m <= 0 || n <= 0) return 0;

        if (m < n) return uniquePaths3(n, m);

        m--;
        n--;
        long res = 1;
        for (int i = 1; i <= n; i++) {
            res *= (m + i);
            res /= i;
        }
        return (int)res;
    }
}
