class NumMatrix {
public:

    vector<vector<int>> dp;

    NumMatrix(vector<vector<int>>& matrix) {
        int r = matrix.size(),c = matrix[0].size();
        dp = matrix;

        for(int i =0;i<r;i++){
            for(int j =0;j<c;j++){
                if(i>0) dp[i][j] += dp[i-1][j]; // add prev row
                if(j>0) dp[i][j] += dp[i][j-1]; // add prev col

                // remove diagonal as it is added twice above
                if(i>0&&j>0) dp[i][j] -= dp[i-1][j-1];
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        int answer = dp[row2][col2];

        if(row1>0) answer -= dp[row1-1][col2];  // remove prev row on col1
        if(col1>0) answer -= dp[row2][col1-1]; // remo prev col on row2

        // add prev diagonal as pre row and prev col both contains that value
        if(row1>0&&col1>0) answer += dp[row1-1][col1-1];
        return answer;
    }
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * NumMatrix* obj = new NumMatrix(matrix);
 * int param_1 = obj->sumRegion(row1,col1,row2,col2);
 */