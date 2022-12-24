/*
    Given 2 strings s & t:
    Return # of distinct subsequences of s which equals t
    Ex. s = "rabbbit", t = "rabbit" -> 3, RABBbIT, RAbBBIT, RABbBIT

    DFS + memo, cache on i & j indices to the # of distinct subseq
    2 choices: if chars equal, look at remainder of both s & t
               if chars not equal, only look at remainder of s

    Time: O(m x n)
    Space: O(m x n)
*/

class Solution {
public:
    int numDistinct(string s, string t) {
        return dfs(s, t, 0, 0);
    }
private:
    // {(i, j) -> # of distinct subsequences}
    map<pair<int, int>, int> dp;
    
    int dfs(string& s, string& t, int i, int j) {
        if (j == t.size()) {
            return 1;
        }
        if (i == s.size()) {
            return 0;
        }
        if (dp.find({i, j}) != dp.end()) {
            return dp[{i, j}];
        }
        
        if (s[i] == t[j]) {
            dp[{i, j}] = dfs(s, t, i + 1, j + 1) + dfs(s, t, i + 1, j);
        } else {
            dp[{i, j}] = dfs(s, t, i + 1, j);
        }
        return dp[{i, j}];
    }
};
