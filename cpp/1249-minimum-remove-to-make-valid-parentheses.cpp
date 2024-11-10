/*
* [1249] Minimum Remove to Make Valid Parentheses *

Given a string s of '(' , ')' and lowercase English characters.

Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

Formally, a parentheses string is valid if and only if:

    It is the empty string, contains only lowercase characters, or
    It can be written as AB (A concatenated with B), where A and B are valid strings, or
    It can be written as (A), where A is a valid string.

Example 1:

Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

Time: O(n)
Space: O(n)

Runtime: 14 ms, faster than 98.14% of C++ online submissions for Minimum Remove to Make Valid Parentheses.
Memory Usage: 14.2 MB, less than 10.57% of C++ online submissions for Minimum Remove to Make Valid Parentheses.
*/



class Solution {
public:
    string minRemoveToMakeValid(string s) {
        stack<pair<char,int>> st;
        
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == '(') {
                st.push(make_pair(s[i], i));
            } else if (s[i] == ')') {
                if (!st.empty() and st.top().first == '(') {
                    st.pop();                
                } else {
                    st.push(make_pair(')', i));
                }
            }
        }

        while (!st.empty()) {
            s.erase(s.begin() + st.top().second);
            st.pop();
        }

        return s;
    }
};
