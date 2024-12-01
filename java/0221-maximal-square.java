class Solution {
    // dp bottom up
    public int maximalSquare(char[][] matrix) {
        int[][] dp = new int[matrix.length + 1][matrix[0].length + 1];
        int maxLen = 0;
        for (int row = matrix.length - 1; row >= 0; row--) {
            for (int col = matrix[0].length - 1; col >= 0; col--) {
                if (matrix[row][col] == '1') {
                    dp[row][col] = 1 + Math.min(Math.min(dp[row + 1][col], dp[row][col + 1]), dp[row + 1][col + 1]);
                    maxLen = Math.max(maxLen, dp[row][col]);
                }
            }
        }

        return maxLen * maxLen;
    }
}