class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int r=matrix.size();
        int c=matrix[0].size();
        for(int i=0;i<r;i++)
        {
            
           if(target>=matrix[i][0] && target<=matrix[i][c-1])
               if(binary_search(matrix[i].begin(),matrix[i].end(),target))
               return true;
            else return false;
           
                
        }
        return false;
    }
};
