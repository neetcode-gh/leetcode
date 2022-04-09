class Solution {
public:
    void solve(const vector<int>& candidates, int target, int idx, vector<int>& curComb, vector<vector<int>>& res) {
        if (target == 0) {
            // found correct combination
            res.push_back(curComb);
            return;
        }
        if (target < 0 || idx >= candidates.size()) // out of bound
            return;
        // include and try, can include the same instance multiple times so don't increase idx
        curComb.push_back(candidates[idx]);
        solve(candidates, target - candidates[idx], idx, curComb, res);
        // exclude and try
        curComb.pop_back();
        solve(candidates, target, idx + 1, curComb, res);
    }

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> comb;
        solve(candidates, target, 0, comb, res);
        return res;
    }
};

