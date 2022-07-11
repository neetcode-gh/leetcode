/*
    Given int array & a target, want to build expressions w/ '+' & '-'
    Return number of different expressions that evaluates to target

    Recursion w/ memoization, cache on (index, total), which stores # ways
    If total ever reaches the target, return 1 (this is a way), else 0

    Time: O(n x target)
    Space: O(n x target)
*/

class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        return backtrack(nums, target, 0, 0);
    }
private:
    // {(index, total) -> # of ways}
    map<pair<int, int>, int> dp;
    
    int backtrack(vector<int>& nums, int target, int i, int total) {
        if (i == nums.size()) {
            return total == target ? 1 : 0;
        }
        if (dp.find({i, total}) != dp.end()) {
            return dp[{i, total}];
        }
        
        dp[{i, total}] = backtrack(nums, target, i + 1, total + nums[i])
                       + backtrack(nums, target, i + 1, total - nums[i]);
        
        return dp[{i, total}];
    }
};
