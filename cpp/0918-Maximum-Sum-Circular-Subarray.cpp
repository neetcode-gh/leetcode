class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        if (nums.size() == 1) { return nums[0]; }
        int total = 0;
        int curr_min = 0;
        int curr_max = 0;
        int glob_min = nums[0];
        int glob_max = nums[0];

        for (const auto& n : nums) {
            curr_min = min(curr_min + n, n);
            curr_max = max(curr_max + n, n);
            total += n;
            glob_min = min(glob_min, curr_min);
            glob_max = max(glob_max, curr_max);
        }
        return (glob_max > 0) ? (max(glob_max, (total - glob_min))) : glob_max;       
    }
};
