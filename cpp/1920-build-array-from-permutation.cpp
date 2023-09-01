class Solution {    
    public:    
        vector<int> buildArray(vector<int>& nums){            
            vector<int> ans;            
            for(int & n : nums){                
                ans.push_back(nums[n]);                
            }            
            return ans;
        }
};
