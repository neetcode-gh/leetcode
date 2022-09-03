/*
    Given 2 strings s & t, return min window substring
    of s such that all chars in t are included in window
    Ex. s = "ADOBECODEBANC" t = "ABC" -> "BANC"

    Sliding window + hash map {char -> count}
    Move j until valid, move i to find smaller

    Time: O(m + n)
    Space: O(m + n)
*/

class Solution {
public:
    string minWindow(string s, string t) {
        // count of char in t
        unordered_map<char, int> m;
        for (int i = 0; i < t.size(); i++) {
            m[t[i]]++;
        }
        
        int i = 0;
        int j = 0;
        
        // # of chars in t that must be in s
        int counter = t.size();
        
        int minStart = 0;
        int minLength = INT_MAX;
        
        while (j < s.size()) {
            // if char in s exists in t, decrease
            if (m[s[j]] > 0) {
                counter--;
            }
            // if char doesn't exist in t, will be -'ve
            m[s[j]]--;
            // move j to find valid window
            j++;
            
            // when window found, move i to find smaller
            while (counter == 0) {
                if (j - i < minLength) {
                    minStart = i;
                    minLength = j - i;
                }
                
                m[s[i]]++;
                // when char exists in t, increase
                if (m[s[i]] > 0) {
                    counter++;
                }
                i++;
            }
        }
        
        if (minLength != INT_MAX) {
            return s.substr(minStart, minLength);
        }
        return "";
    }
};


// Another Approach
/*
 * @lc app=leetcode id=76 lang=cpp
 *
 * [76] Minimum Window Substring
 */

// @lc code=start
class Solution
{
public:
    // did not get
    // Os+t time Os+t space
    string minWindow(string s, string t, string ans = "")
    {

        if (t == "")
            return "";

        // t and s dictionary
        unordered_map<char, int> countT, window;

        // t dictionary
        for (char c : t)
            countT[c]++;

        int have = 0, need = countT.size();
        // result position
        vector<int> res = {-1,
                           -1};

        // result length
        int resLen = INT_MAX;

        // start position
        int l = 0;

        // traverse s string
        for (int r = 0; r < s.size(); r++)
        {
            char c = s[r];
            window[c]++;

            // check if c is present in t's dictionary and if its occurrence is equal in both dictionaries
            if (countT.find(c) != countT.end() && window[c] == countT[c])
            {
                have += 1;
            }

            // all characters of t are present in current s substring
            while (have == need)
            {
                // update our result
                if ((r - l + 1) < resLen)
                {
                    res[0] = l;
                    res[1] = r;
                    resLen = r - l + 1;
                }
                // pop from the left of our window
                window[s[l]] -= 1;

                // check if s[l] is present in t's dictionary and if its occurrence is less in s's dictionary
                if (countT.find(s[l]) != countT.end() && window[s[l]] < countT[s[l]])
                {
                    have -= 1;
                }

                // popped from left
                l += 1;
            }
        }

        int start = res[0];
        int end = res[1];
        if (resLen != INT_MAX)
            return s.substr(start, end - start + 1);
        else
            return "";
    }
};
// @lc code=end

