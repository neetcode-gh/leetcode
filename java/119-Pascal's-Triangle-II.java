//Approach 1 using recursion 

class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> ans = new ArrayList<>();
        int[][] dp = new int[rowIndex+1][rowIndex+1];
        for (int i = 0; i<=rowIndex; i++) {
            ans.add(value(rowIndex, i, dp));
        }
        return ans;
    }
    
    
    public int value(int row, int col, int[][] dp) {
        if (row == 0 || col == 0 || col == row)
            return 1;
        if (dp[row][col]!=0) return dp[row][col];
        dp[row][col] = value(row-1, col-1, dp)+value(row-1, col, dp);
        return dp[row][col];
    }
    
}

//todo: add bottom up approach
