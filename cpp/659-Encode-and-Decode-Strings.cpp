class Solution {
public:
    /*
     * @param strs: a list of strings
     * @return: encodes a list of strings to a single string.
     */
    string encode(vector<string> &strs) {
        stringstream ss;
        for (const string &s : strs) {
            ss << s.size();
            ss << '#';
            ss << s;
        }
        return ss.str();
    }

    /*
     * @param str: A string
     * @return: dcodes a single string to a list of strings
     */
    vector<string> decode(string &str) {
        vector<string> strs;

        int i = 0;
        while (i < str.size()) {
            int j = i;
            while (str[j] != '#')
                j += 1;

            int length = stoi(str.substr(i, j));
            strs.push_back(str.substr(j + 1, length));

            i = j + 1 + length;
        }

        return strs;
    }
};

