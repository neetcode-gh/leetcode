class Solution {
public:
    unordered_map<char, string> digitToChar = {
        {'2',"abc"},
        {'3',"def"},
        {'4',"ghi"},
        {'5',"jkl"},
        {'6',"mno"},
        {'7',"qprs"},
        {'8',"tuv"},
        {'9',"wxyz"}
    };

    void solve(const string &digits, vector<string> &res, int idx, string curStr) {
        if (idx == digits.size()) {
            res.push_back(curStr);
            return;
        }
        for (char c : digitToChar[digits[idx]]) {
            solve(digits, res, idx + 1, curStr+c);
        }
    }

    vector<string> letterCombinations(string digits) {
        vector<string> res;
        if (digits.size() > 0)
            solve(digits, res, 0, "");
        return res;
    }
};
