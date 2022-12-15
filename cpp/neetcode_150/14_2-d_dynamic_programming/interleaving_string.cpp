/*
    Given 3 strings, find if s3 is formed by interleaving of s1 & s2
    Ex. s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac" -> true

    DFS + memo, cache on s1 & s2 indices i & j
    2 choices: either take s1 & iterate i, or take s2 & iterate j

    Time: O(m x n)
    Space: O(m x n)
*/
/*
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        if (s3.size() != s1.size() + s2.size()) {
            return false;
        }
        return dfs(s1, s2, s3, 0, 0);
    }
private:
    map<pair<int, int>, bool> dp;
    
    bool dfs(string s1, string s2, string s3, int i, int j) {
        if (i == s1.size() && j == s2.size()) {
            return true;
        }
        if (dp.find({i, j}) != dp.end()) {
            return dp[{i, j}];
        }
        
        if (i < s1.size() && s1[i] == s3[i + j] && dfs(s1, s2, s3, i + 1, j)) {
            return true;
        }
        if (j < s2.size() && s2[j] == s3[i + j] && dfs(s1, s2, s3, i, j + 1)) {
            return true;
        }
        
        dp[{i, j}] = false;
        return dp[{i, j}];
    }
};
*/
// Top-down solution using a DP matrix
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int n1 = s1.size();
        int n2 = s2.size();
        if (n1 + n2 != s3.size())
            return false;
        
        vector<vector<bool>> DP(n1+1, vector<bool>(n2+1, false));
        DP[0][0] = true;

        for (int i = 0; i <= n1; ++i){
            for (int j = 0; j <= n2; ++j){
                if (i > 0 && DP[i-1][j] && s1[i-1] == s3[i+j-1])
                    DP[i][j] = true;
                if (j > 0 && DP[i][j-1] && s2[j-1] == s3[i+j-1])
                    DP[i][j] = true;
            }
        }

        return DP[n1][n2];
    }
};
