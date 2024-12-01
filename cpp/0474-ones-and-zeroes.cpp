class Solution {
public:
    int rec(vector<pair<int, int>>& oz, int i, int m, int n, vector<vector<vector<int>>>& dp)
    {
        if (i >= oz.size())
            return 0;

        if (oz[i].first > m || oz[i].second > n)
            return rec(oz, i + 1, m, n, dp);
        
        if (dp[i][m][n] != -1)
            return dp[i][m][n];
        
        int take = 1 + rec(oz, i + 1, m - oz[i].first, n - oz[i].second, dp);
        int notTake = rec(oz, i + 1, m, n, dp);

        return dp[i][m][n] = max(take, notTake);
    }
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<pair<int, int>> oz(strs.size());
        vector<vector<vector<int>>> dp (strs.size() + 1, vector<vector<int>>(m + 1, vector<int> (n + 1, -1)));

        for (int i = 0; i < strs.size(); i++)
        {
            int one = 0, zero = 0;
            for (int j = 0; j < strs[i].size(); j++)
            {
                if (strs[i][j] == '1')
                    one++;
                else
                    zero++;
            }
            oz[i] = {zero, one};
        }
        
        return rec(oz, 0, m, n, dp);
    }
};
