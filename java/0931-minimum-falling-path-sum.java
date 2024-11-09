/*----------------------------------
  Time Complexity: O(n^2)
  Space Complexity: (1)
----------------------------------*/ 

class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int N = matrix.length;

        for(int r = 1; r < N; r++){
            for(int c = 0; c < N; c++){
                int mid = matrix[r-1][c];
                int left = (c > 0)? matrix[r-1][c-1]: Integer.MAX_VALUE;
                int right = (c < N-1)? matrix[r-1][c+1]: Integer.MAX_VALUE;
                matrix[r][c] = matrix[r][c] + Math.min(left, Math.min(mid, right));
            }
        }
        int res = Integer.MAX_VALUE;
        for(int i = 0; i < N; i++){
            res = Math.min(res, matrix[N-1][i]);
        }
        return res;
    }
}

/*----------------------------------
  Time Complexity: O(n^2)
  Space Complexity: (n^2)
----------------------------------*/  

class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[][] dp = new int[n+1][n+1];

        for(int i = n-1; i >= 0; i--){
            for(int j = 0; j < n; j++){
                if(j == 0)
                    dp[i][j] = matrix[i][j] + Math.min(dp[i+1][j], dp[i+1][j+1]);
                else if (j == n-1) {
                    dp[i][j] = matrix[i][j] + Math.min(dp[i+1][j-1], dp[i+1][j]);
                } else{
                    int min = dp[i+1][j-1];
                    if(dp[i+1][j] < min)
                        min = dp[i+1][j];
                    if(dp[i+1][j+1] < min)
                        min = dp[i+1][j+1];

                    dp[i][j] = matrix[i][j] + min;
                }
            }
        }
        int res = Integer.MAX_VALUE;
        for(int i=0; i<n; i++)
            res = Math.min(res, dp[0][i]);

        return res;    
    }
}
