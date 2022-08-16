/*
    Evaluate RPN, valid operators: +, -, *, /

    Stack, if num push, if operator apply to top 2 nums

    Time: O(n)
    Space: O(n)
*/

class Solution {
private:
    int helper(stack<int>& st){
        int top = st.top();
        st.pop();
        return top;
    }
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        
        for(auto s: tokens){
            if(s == "+")
                st.push(helper(st) + helper(st));
            else if(s == "-"){
                int a = helper(st);
                int b = helper(st);
                st.push(b-a);
            }
            else if(s == "*")
                st.push(helper(st) * helper(st));
            else if(s=="/"){
                int a = helper(st);
                int b = helper(st);
                st.push(b/a);
            }
            else
                st.push(stoi(s));
            
        }
        return st.top();
    }
};
