class Solution {
public:
    int solve(const vector<vector<int>>& matrix, vector<vector<int>> &dp, int ROWS, int COLS, int r, int c, int prevVal) {
        if (r < 0 || r == ROWS || c < 0 || c == COLS
            || matrix[r][c] <= prevVal)  // this path is not increasing
            return 0;
        if (dp[r][c] != -1)
            return dp[r][c];
        int res = 1;
        res = max(res, 1 + solve(matrix, dp, ROWS, COLS, r + 1, c, matrix[r][c]));
        res = max(res, 1 + solve(matrix, dp, ROWS, COLS, r - 1, c, matrix[r][c]));
        res = max(res, 1 + solve(matrix, dp, ROWS, COLS, r, c + 1, matrix[r][c]));
        res = max(res, 1 + solve(matrix, dp, ROWS, COLS, r, c - 1, matrix[r][c]));
        dp[r][c] = res;
        return res;
    }

    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        vector<vector<int>> dp(ROWS, vector<int>(COLS, -1));
        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                solve(matrix, dp, ROWS, COLS, r, c, -1);
            }
        }

        int res = dp[0][0];
        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                res = max(res, dp[r][c]);
            }
        }
        return res;
    }
};
