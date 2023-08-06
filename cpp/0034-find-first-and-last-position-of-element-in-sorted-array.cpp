/*
    Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
    Ex. nums = [5,7,7,8,8,10], target = 8 -> [3, 4] (start position is 3, end position is 4)

    Use binary search, firstly binary search left endpoint, then binary search right endpoint.

    Time: O(log n)
    Space: O(1)
*/

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        if (nums.empty()) return {-1, -1};
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if (nums[mid] >= target) r = mid;
            else l = mid + 1;
        }
        if (nums[l] != target) return {-1, -1};
        int left = l;

        l = 0, r = nums.size() - 1;
        while (l < r) {
            int mid = l + r + 1ll >> 1;
            if (nums[mid] <= target) l = mid;
            else r = mid - 1;
        }
        return {left, r};
    }
};