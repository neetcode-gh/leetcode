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

    void solve(const string& s, vector<vector<string>>& res, vector<string>& part, int idx) {
        if (idx >= s.size()) {
            res.push_back(part);
            return;
        }
        for (int j = idx; j < s.size(); ++j) {
            if (isPali(s, idx, j)) {
                part.push_back(s.substr(idx, j - idx + 1));
                solve(s, res, part, j + 1);
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
