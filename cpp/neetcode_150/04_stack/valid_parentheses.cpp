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
        stack<char> st;
        unordered_map<char, char> pairs;
        pairs['('] = ')';pairs['{'] = '}';pairs['['] = ']';
        for(auto c : s){
            if(pairs.find(c) != pairs.end()) st.push(c);
            else if(st.size() != 0 and pairs[st.top()] == c) st.pop();
            else return false;
        }
        return st.size() == 0;
    }
};
