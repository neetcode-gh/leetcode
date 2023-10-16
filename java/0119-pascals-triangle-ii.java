//Approach 1 using recursion

class Solution {

    public List<Integer> getRow(int rowIndex) {
        List<Integer> ans = new ArrayList<>();
        int[][] dp = new int[rowIndex + 1][rowIndex + 1];
        for (int i = 0; i <= rowIndex; i++) {
            ans.add(value(rowIndex, i, dp));
        }
        return ans;
    }

    public int value(int row, int col, int[][] dp) {
        if (row == 0 || col == 0 || col == row) return 1;
        if (dp[row][col] != 0) return dp[row][col];
        dp[row][col] = value(row - 1, col - 1, dp) + value(row - 1, col, dp);
        return dp[row][col];
    }

    /** Iterative approach to solving the problem - follows Neetcode's solution in Python
     *  O(n) time complexity
     * */
    public List<Integer> getRow(int rowIndex) {
        List<Integer> res = new ArrayList<>(rowIndex + 1);
        for (int i = 0; i < rowIndex + 1; i++) {
            res.add(1);
        }

        for (int i = 2; i < rowIndex + 1; i++) {
            for (int j = i - 1; j > 0; j--) {
                res.set(j, res.get(j) + res.get(j - 1));
            }
        }
        return res;
    }


}
//todo: add bottom up approach
