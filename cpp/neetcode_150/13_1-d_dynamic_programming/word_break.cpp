/*
    Given a string & dictionary, return true if:
    Can segment string into 1 or more dictionary words

    DP, at each loop, substring, check if in dict, & store

    Time: O(n^3)
    Space: O(n)
*/

class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> words;
        for (int i = 0; i < wordDict.size(); i++) {
            words.insert(wordDict[i]);
        }
        
        int n = s.size();
        vector<bool> dp(n + 1);
        dp[0] = true;
        
        for (int i = 1; i <= n; i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (dp[j]) {
                    string word = s.substr(j, i - j);
                    if (words.find(word) != words.end()) {
                        dp[i] = true;
                        break;
                    }
                }
            }
        }
        
        return dp[n];
    }
};
