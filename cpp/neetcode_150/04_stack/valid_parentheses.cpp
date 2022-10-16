/*
    Given s w/ '(, ), {, }, [, ]', determine if valid
    Ex. s = "()[]{}" -> true, s = "(]" -> false

    Stack of opens, check for matching closes & validity

    Time: O(n)
    Space: O(n)
*/

class Solution {
public:
    bool isValid(string s) {
        stack<char> open;
        
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == ')' || s[i] == '}' || s[i] == ']') {
                if (open.empty()) {
                    return false;
                }
                if (s[i] == ')' && open.top() != '(') {
                    return false;
                }
                if (s[i] == '}' && open.top() != '{') {
                    return false;
                }
                if (s[i] == ']' && open.top() != '[') {
                    return false;
                }
                open.pop();
            } else {
                open.push(s[i]);
            }
        }
        
        if (!open.empty()) {
            return false;
        }
        return true;
    }
};
