class Solution {
public:
    bool isValid(string s) {
        stack<char> stk;
        for(auto a: s) {
            if (a=='(' || a=='{' || a=='[') {
                stk.push(a);
            }
            else {
                if(stk.empty()) return false;
                if( (stk.top() == '(' && a==')') || (stk.top() == '{' && a=='}') || (stk.top() == '[' && a==']') )
                    stk.pop();
                else return false;
            }
        }
        
        return stk.empty(); 
    }
};