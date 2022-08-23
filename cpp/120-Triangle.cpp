class Solution{    
    public:    
        int minimumTotal(vector<vector<int>>& triangle){            
            for(int i = 0; i < triangle.size() - 1; i++){                
                for(int k = 0; k < triangle[i + 1].size(); k++){                    
                    if(k == 0){                        
                        triangle[i + 1][0] = triangle[i + 1][0] + triangle[i][0];                    
                    }
                    else{                        
                        if(k == triangle[i + 1].size() - 1){                           
                            triangle[i + 1][k] = triangle[i + 1][k] + triangle[i][k - 1];                           
                        }
                        else{                            
                            triangle[i + 1][k] = triangle[i + 1][k] + min(triangle[i][k - 1], triangle[i][k]);                            
                        }                       
                    }                    
                }                
            }            
            return *min_element(triangle[triangle.size() - 1].begin(), triangle[triangle.size() - 1].end());        
        }    
};
