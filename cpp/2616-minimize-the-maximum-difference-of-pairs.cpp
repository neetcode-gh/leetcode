#include <algorithm>
#include <vector>

class Solution {
public:
    int num_of_pairs(vector<int>& nums, int max_diff) {
        int num_of_pairs = 0;
        for (int i = 1, n = nums.size(); i < n; i++) {
            int diff = nums[i] - nums[i - 1];
            if (diff <= max_diff) {
                num_of_pairs += 1;
                i++;
            }
        }
        return num_of_pairs;
    }

    int minimizeMax(vector<int>& nums, int p) {
        std::sort(nums.begin(), nums.end());
        int left = 0, right = nums.back() - nums.front();
        while (left <= right) {
            int max_diff = (left + right) / 2;
            if (num_of_pairs(nums, max_diff) >= p)
                right = max_diff - 1;
            else
                left = max_diff + 1;
        }
        return left;
    }
};
