/*
    Given int array & a target, want to build expressions w/ '+' & '-'
    Return number of different expressions that evaluates to target

    Recursion w/ memoization, cache on (index, total), which stores # ways
    If total ever reaches the target, return 1 (this is a way), else 0

    Time: O(n x target)
    Space: O(n x target)
*/
/* 
// This solution adds a logn complexity for each insertion and search inside
// of the map (since it is implemented as a tree).
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
*/
// Faster solution using a (n x maxSum*2) matrix.
// sumCap is the sum over all the nums array elements, and is
// used both for initializing the array (as an INT_MAX), and
// as an offset to sum to the currSum, in order to match the
// array's 0-indexing (otherwise it would've tried to access the 
// -1 element of the array, for example).
// O(n x target) time.
// O(n x maxSum*2) space.
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sumCap = accumulate(nums.begin(), nums.end(), 0) + 1;
        vector<vector<int>> DP(nums.size(), vector<int>(sumCap * 2, sumCap));
        return backtrack(nums, target, sumCap, 0, 0, DP);        
    }
private:
    int backtrack(vector<int>& nums, int target, int sumCap, int currSum, int idx, vector<vector<int>>& DP){
        if (idx == nums.size())
            return currSum == target ? 1 : 0;
        
        if (DP[idx][currSum + sumCap] != sumCap)
            return DP[idx][currSum + sumCap];
        
        DP[idx][currSum + sumCap] = backtrack(nums, target, sumCap, currSum + nums[idx], idx + 1, DP) +
                            backtrack(nums, target, sumCap, currSum - nums[idx], idx + 1, DP);
        
        return DP[idx][currSum + sumCap];
    }
};
