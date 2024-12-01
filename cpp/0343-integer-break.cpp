/*
Given an integer n, break it into the sum of k positive integers, where k >= 2, and maximize the product of those integers.
Return the maximum product that we can get.

Example. For n = 10, we can break it as 10 = 3 + 3 + 4. Product of these integers is 3 x 3 x 4 = 36, which is the maximum product that
	 we can get in this case. So we return 36 as the answer. 


Time: O(n^2)
Space: O(n)

*/

class Solution {
public:
    int integerBreak(int n) {
        vector<int> dp(n+1, INT_MIN);
        dp[0] = 1, dp[1] = 1;
        for(int ind=2; ind<=n; ind++) {
            for(int i=ind-1; i>=1; i--) {
                dp[ind] = max(dp[ind], i * dp[ind - i]);
            }
            if(ind < n) dp[ind] = max(dp[ind], ind);
        }
        return dp[n];
    }
};

