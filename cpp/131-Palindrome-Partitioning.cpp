class Solution {
public:
    bool isPali(const string& s, int l, int r) {
        while (l < r) {
            if (s[l] != s[r])
                return false;
            ++l, --r;
        }
        return true;
    }

    void solve(const string& s, vector<vector<string>>& res, vector<string>& part, int i) {
        if (i >= s.size()) {
            res.push_back(part);
            return;
        }
        for (int j = i; j < s.size(); ++j) {
            if (isPali(s, i, j)) {
                // i~j substr is palindrome
                part.push_back(s.substr(i, j - i + 1));
                // check next substring
                solve(s, res, part, j);
                // backtrack
                part.pop_back();
            }
        }
    }

    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> part;

        solve(s, res, part, 0);
        return res;
    }
};
