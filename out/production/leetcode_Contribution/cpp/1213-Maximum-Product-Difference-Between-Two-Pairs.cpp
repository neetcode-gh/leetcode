class Solution{    
    public:    
        int maxProductDifference(vector<int>& nums){            
            sort(nums.begin(), nums.end());            
            return nums.rbegin()[1] * nums.back() - nums[0] * nums[1];
        }    
};
