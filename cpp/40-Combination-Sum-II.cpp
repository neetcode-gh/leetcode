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
        int prev = -1;
        for (int i = idx; i < candidates.size(); ++i) {
            if (candidates[i] == prev) // skip all the numbers same as previously chosen
                continue;
            // include and try
            curComb.push_back(candidates[i]);
            solve(candidates, target - candidates[i], i + 1, curComb, res);
            // exclude
            curComb.pop_back();
            prev = candidates[i];
        }
    }

    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> comb;
        // sort candidates to completely exclude duplicate number in combinations
        sort(candidates.begin(), candidates.end());
        solve(candidates, target, 0, comb, res);
        return res;
    }
};
