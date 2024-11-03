class Solution {
    public int stoneGameII(int[] piles) {
        Integer[][][] dp = new Integer[2][piles.length + 1][piles.length + 1];
        return dfs(piles, 0, 0, 1, dp);
    }

    private int dfs(int[] piles, int alice, int i, int M, Integer[][][] dp) {
        if (i == piles.length) {
            return 0;
        }
        if (dp[alice][i][M] != null) {
            return dp[alice][i][M];
        }
        int res = (alice == 0) ? 0 : Integer.MAX_VALUE;
        int total = 0;
        for (int X = 1; X < 2 * M + 1; X++) {
            if (i + X > piles.length) {
                break;
            }
            total += piles[i + X - 1];
            int recurRes = dfs(piles, 1 - alice, i + X, Math.max(X, M), dp);
            if (alice == 0) {
                res = Math.max(res, total + recurRes);
            } else {
                res = Math.min(res, recurRes);
            }
        }
        dp[alice][i][M] = res;
        return res;
    }
}
