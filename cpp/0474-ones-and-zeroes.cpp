class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        vector<vector<int>> dp(m+1,vector<int>(n+1,0));
        for(string s: strs)
        {
            int z = 0, o = 0;
            for(int i = 0; i<s.size(); i++)
            {
                if(s[i] == '0')
                    z++;
                else o++;
            }

            for(int i = m; i>=0; i--)
            {
                for(int j = n; j>=0; j--)
                {
                    int c1 = dp[i][j];
                    int c2 = -1e8;
                    if(z<=i && o<=j)
                        c2 = 1 + dp[i-z][j-o];
                    dp[i][j] = max(c1,c2);
                }
            }
        }
        return dp[m][n];
    }
};
