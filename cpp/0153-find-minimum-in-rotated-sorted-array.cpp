/*
 * @lc app=leetcode id=153 lang=cpp
 *
 * [153] Find Minimum in Rotated Sorted Array
 */

// @lc code=start
class Solution {
public:
    int findMin(vector<int> &nums) {
        int l = 0;
        int r = nums.size() - 1;
        int res = nums[0];
        while (l <= r) {
            int mid = (r - l) / 2 + l;
            if (nums[mid] >= res) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
            res = std::min(nums[mid], res);
        }
        return res;
    }
};
// @lc code=end
