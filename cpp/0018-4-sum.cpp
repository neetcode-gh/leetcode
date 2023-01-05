/* 
Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.

Example:
    Input: nums = [1,0,-1,0,-2,2], target = 0
    Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
*/

class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        
        vector<vector<int>> res;
        if(nums.empty()) {
            return res;
        }
        
        sort(nums.begin(), nums.end());
        int n = nums.size();
        
        for(int i=0; i<n; i++) {
            long long int target_3 = target - nums[i];
            for(int j=i+1; j<n; j++) {
                long long int target_2 = target_3 - nums[j];
                
                int left = j+1;
                int right = n-1;
                
                while(left < right) {
                    int two_sum = nums[left] + nums[right];
                    
                    if(two_sum < target_2) {
                        left++;
                    }
                    else if(two_sum > target_2) {
                        right--;
                    }
                    else {
                        vector<int> temp(4,0);
                        temp[0] = nums[i];
                        temp[1] = nums[j];
                        temp[2] = nums[left];
                        temp[3] = nums[right];
                        
                        res.push_back(temp);
                        
                        while(left < right && nums[left] == temp[2]) left++;
                        while(left < right && nums[right] == temp[3]) right--;
                    }
                }
                while(j+1 < n && nums[j+1] == nums[j]) ++j;
            }
            while(i+1 < n && nums[i+1] == nums[i]) ++i;
        }
        return res;
    }
};