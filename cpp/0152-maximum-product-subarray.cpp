class Solution {
public:
    int maxProduct(vector<int>& nums) {
        double res = nums[0];
        double curMin = 1, curMax = 1;
        
        for(int i = 0; i < nums.size(); i++)
        {
            double n = nums[i];
                
            double tmp = curMax * n;
            curMax = max(max(n * curMax, n * curMin), n);
            curMin = min(min(tmp, n * curMin), n);
            res = max(res, curMax);
        }
        
        return res;
    }
};
