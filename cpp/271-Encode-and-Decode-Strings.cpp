class Solution {
public:
    string encode(vector<string> &strs) {
        string result;
        for (string s : strs) {
            result += to_string((int)s.size());
            result += "#";
            result += s;
        }
        return result;
    }

    vector<string> decode(string &str) {
        vector<string> result;
        int i = 0;
        while (i < str.size()) {
            int j = i;
            while (str[j] != '#') {
                ++j;
            }
            int curLen = stoi(str.substr(i, j - i));
            string cur = str.substr(j + 1, curLen);
            result.push_back(cur);
            i = j + 1 + curLen;
        }
        return result;
    }
};
