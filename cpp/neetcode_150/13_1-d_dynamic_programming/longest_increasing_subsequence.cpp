/*
    Given int array, return length of longest increasing subsequence
    Ex. nums = [10,9,2,5,3,7,101,18] -> 4, [2,3,7,101]

    Why DP? 1) Max/min of smth, 2) make decisions based on prev decisions
    "Decision": is it worth it to consider this number?
    If use may contribute to better LIS, but may also eliminate an even better LIS

    Framework to solve DP:
    1) Need some function or array that represents ans to the problem (dp array)
    2) Way to transition b/w states (recurrence relation), depends on question
    3) Need a base case (initial solution for every subproblem)

    Recurrence relation: dp[i] = max(dp[j] + 1)
    Base case: dp[i] = 1, since every element on its own has an LIS of 1

    Time: O(n^2)
    Space: O(n)
*/
/*
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);
        
        int result = 1;
        
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            result = max(result, dp[i]);
        }
        
        return result;
    }
};
*/

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> LIS(n, 1);
        
        for (int i = n - 1; i >= 0; --i){
            for (int j = i + 1; j < n; ++j){
                if (nums[i] < nums[j])
                    LIS[i] = max(LIS[i], 1 + LIS[j]);
            }
        }

        return *max_element(LIS.begin(), LIS.end());
    }
};
