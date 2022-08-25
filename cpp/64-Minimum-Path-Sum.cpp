class Solution{
    public:    
        void Helper(vector<vector<int>> & grid, vector<vector<int>> & dp, int i, int k){            
            int X = grid.size();            
            int Y = grid[0].size();            
            for(int i = 0; i < X; i++){                
                for(k = 0; k < Y; k++){                    
                    if((i - 1 >= 0) && (k - 1 >= 0)){
                        dp[i][k] = grid[i][k] + min(dp[i - 1][k], dp[i][k - 1]);             
                    }
                    else{
                        if(i - 1 >= 0){
                            dp[i][k] = grid[i][k] + dp[i - 1][k];
                        }                        
                        if(k - 1 >= 0){
                            dp[i][k] = grid[i][k] + dp[i][k - 1];
                        }
                    }
                }
            }   
            
        }    
        int minPathSum(vector<vector<int>>& grid){            
            vector<vector<int>> dp(grid.size(), vector<int>(grid[0].size()));            
            dp[0][0] = grid[0][0];            
            Helper(grid, dp, grid.size() - 1, grid[0].size() - 1);            
            return dp[grid.size() - 1][grid[0].size() - 1];        
        }
};
