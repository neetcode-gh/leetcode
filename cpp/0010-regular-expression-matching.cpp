/*
    Given string & pattern, implement RegEx matching
    '.' -> matches any single character
    '*' -> matches zero or more of the preceding element
    Matching should cover the entire input string (not partial)
    Ex. s = "aa", p = "a" -> false, "a" doesn't match entire string "aa"

    DFS + memo, 2 choices at a *: either use it, or don't use it

    Time: O(m x n)
    Space: O(m x n)
*/

class Solution {
public:
    bool isMatch(string s, string p) {
        return dfs(s, p, 0, 0);
    }
private:
    map<pair<int, int>, bool> dp;
    
    bool dfs(string& s, string& p, int i, int j) {
        if (dp.find({i, j}) != dp.end()) {
            return dp[{i, j}];
        }
        
        if (i >= s.size() && j >= p.size()) {
            return true;
        }
        if (j >= p.size()) {
            return false;
        }
        
        bool match = i < s.size() && (s[i] == p[j] || p[j] == '.');
        if (j + 1 < p.size() && p[j + 1] == '*') {
            // choices: either (1) don't use *, or (2) use *
            dp[{i, j}] = dfs(s, p, i, j + 2) || (match && dfs(s, p, i + 1, j));
            return dp[{i, j}];
        }
        
        if (match) {
            dp[{i, j}] = dfs(s, p, i + 1, j + 1);
            return dp[{i, j}];
        }
        
        dp[{i, j}] = false;
        return dp[{i, j}];
    }
};
