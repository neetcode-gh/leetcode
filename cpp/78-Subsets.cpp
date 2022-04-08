class Solution {
public:
    void solve(const vector<int>& nums, int idx, vector<int> &curSubset, vector<vector<int>> & res) {
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
        solve(nums, idx + 1, curSubset, res);
    }

    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> subset;
        solve(nums, 0, subset, res);
        return res;
    }
};
