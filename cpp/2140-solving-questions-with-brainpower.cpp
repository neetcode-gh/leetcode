// Time Complexity: O(n)
// Space Complexity: O(n)

class Solution
{
public:
    long long mostPoints(vector<vector<int>> &questions)
    {
        int n = questions.size();
        vector<long long> dp(n, 0);
        dp[n - 1] = questions[n - 1][0];
        long long ans = dp[n - 1];
        for (int i = n - 2; i >= 0; i--)
        {
            int k = i + questions[i][1] + 1;
            if (k < n)
            {
                dp[i] = (dp[k] + questions[i][0]) > dp[i + 1] ? (dp[k] + questions[i][0]) : dp[i + 1];
            }
            else
            {
                dp[i] = questions[i][0] > dp[i + 1] ? questions[i][0] : dp[i + 1];
            }
            ans = ans > dp[i] ? ans : dp[i];
        }
        return ans;
    }
};