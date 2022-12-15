/*
    Given a string & dictionary, return true if:
    Can segment string into 1 or more dictionary words

    DP, at each loop, substring, check if in dict, & store

    Time: O(n^3)
    Space: O(n)
*/
/*
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
*/

/*
    Given a string & dictionary, return true if:
    Can segment string into 1 or more dictionary words

    Bottom-up DP: for each position in the string, loop over
    the words in the dictionary. If the word matches the substring
    starting at the current position, assign to the DP array in the 
    same position the same value of the DP array at position + matched_word
    length.

    Time: O(n^2 * m)
    Space: O(n)
*/
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        int strSize = s.size();
        vector<bool> dp(strSize + 1);
        dp[strSize] = true;

        for (int i = strSize - 1; i >= 0; --i){
            for (string& w : wordDict){
                if (i + w.size() <= strSize && s.substr(i, w.size()) == w)
                    dp[i] = dp[i + w.size()];
                if (dp[i])
                    break;
            }
        }

        return dp[0];
    }
};
