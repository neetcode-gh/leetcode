/*
    Given n pairs of parentheses, generate all combos of well-formed parentheses
    Ex. n = 3 -> ["((()))","(()())","(())()","()(())","()()()"], n = 1 -> ["()"]

    Backtracking, keep valid, favor trying opens, then try closes if still valid

    Time: O(2^n)
    Space: O(n)
*/

class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        generate(n, 0, 0, "", result);
        return result;
    }
private:
    void generate(int n, int open, int close, string str, vector<string>& result) {
        if (open == n && close == n) {
            result.push_back(str);
            return;
        }
        if (open < n) {
            generate(n, open + 1, close, str + '(', result);
        }
        if (open > close) {
            generate(n, open, close + 1, str + ')', result);
        }
    }
};

/*
    Using a single stack without recursion

    Time: O(2^n)
    Space: O(n)
*/
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        stack<vector<string>> stk;
        vector<string> result;
        stk.push({"(", "1", "0"}); // {string, left_count, right_count}

        while (!stk.empty()) {
            for (int i = 0; i < stk.size(); i++) {
                vector<string> item = stk.top();
                stk.pop();
                int left = stoi(item[1]), right = stoi(item[2]);
                if (left == n && right == n) {
                    result.push_back(item[0]);
                    continue;
                }
                if (left < n) {
                    stk.push({item[0] + "(", to_string(++left), to_string(right)});
                    left--; // reverse left count
                }
                if (left > right) {
                    stk.push({item[0] + ")", to_string(left), to_string(++right)});
                }
            }
        }
        return result;
    }
};
