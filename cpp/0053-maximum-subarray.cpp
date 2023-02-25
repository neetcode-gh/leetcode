/*
    Given int array, find contiguous subarray w/ max sum
    Ex. nums = [-2,1,-3,4,-1,2,1,-5,4] -> 6, [4,-1,2,1]

    At each point, determine if it's better to add to curr sum or start over

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int curr = nums[0];
        int result = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            curr = max(curr + nums[i], nums[i]);
            result = max(result, curr);
        }
        
        return result;
    }
};
