/*
2679. Sum in a Matrix

T.C -> O(r * clogc)
S.C -> O(c)
*/
class Solution {
public:
    int matrixSum(vector<vector<int>>& nums) {
        int cols = nums[0].size();
        vector<int> maxs(cols);
        for(vector<int>& row : nums){
            sort(row.begin(),row.end());
            for(int i=0;i<cols;i++){
                maxs[i] = max(maxs[i], row[i]);
            }
        }
        return reduce(maxs.begin(), maxs.end());
    }
};