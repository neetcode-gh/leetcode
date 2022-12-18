class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int l = triangle.size();
        int[] dp = new int[l + 1];

        for (int row = l - 1; row > -1; --row) {
            for (int col = 0; col < row + 1; ++col) {
                dp[col] = triangle.get(row).get(col) + Math.min(dp[col], dp[col + 1]);
            }
        }

        return dp[0];
    }
}
