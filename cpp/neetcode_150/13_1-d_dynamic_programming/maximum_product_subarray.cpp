/*
    Given int array, find contiguous subarray w/ max product, return product
    Ex. nums = [2,3,-2,4] -> output = 6, [2,3] has max product at 6

    Think wrt combo chains, if +'ve ints good, but if 0's bad, if -'ve depends
    0's force reset, -'ve could sway the best ans, therefore track currMax & currMin

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int currMax = nums[0];
        int currMin = nums[0];
        int result = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            int temp = currMax;
            
            currMax = max(max(currMax * nums[i], currMin * nums[i]), nums[i]);
            currMin = min(min(currMin * nums[i], temp * nums[i]), nums[i]);
            
            result = max(result, currMax);
        }
        
        return result;
    }
};
