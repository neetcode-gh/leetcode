class Solution {
public:
    string decodeString(string s) {
        stack<string> stack;
        string result;

        for (int i = 0; i < s.length(); i++) {
            if (s[i] != ']') {
                stack.push(string(1, s[i]));
            } else {
                string substr;
                while (!stack.empty() && stack.top() != "[") {
                    substr = stack.top() + substr;
                    stack.pop();
                }
                stack.pop();

                string k;
                while (!stack.empty() && isdigit(stack.top()[0])) {
                    k = stack.top() + k;
                    stack.pop();
                }
                int kInt = stoi(k);

                string temp;
                for (int j = 0; j < kInt; j++) {
                    temp += substr;
                }
                stack.push(temp);
            }
        }

        while (!stack.empty()) {
            result = stack.top() + result;
            stack.pop();
        }

        return result;
    }
};
