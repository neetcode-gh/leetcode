class Solution {
public:
    void solve(const vector<int>& nums, int idx, vector<int>& curSubset, vector<vector<int>>& res) {
        if (idx >= nums.size()) {
            // reached the end, add current to result
            res.push_back(vector<int>(curSubset));
            return;
        }
        // subset with current element
        curSubset.push_back(nums[idx]);
        solve(nums, idx + 1, curSubset, res);
        // subset without current element
        curSubset.pop_back();
        // skip duplicate elements
        ++idx;
        while (idx < nums.size() && nums[idx] == nums[idx - 1])
            ++idx;
        solve(nums, idx, curSubset, res);
    }

    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end()); // to exclude duplication later
        vector<int> subset;
        solve(nums, 0, subset, res);
        return res;
    }
};
