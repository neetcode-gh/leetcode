class Solution {
public:
    /**
     * @param strs a list of strings
     * @return encodes a list of strings to a single string
     */
    string encode(vector<string>& strs) {
        // Write your code here
        string ans;
        for (int i = 0; i < strs.size(); i++) {
        	string s = strs[i];
        	for (int j = 0; j < s.length(); j++) {
        		if (s[j] == ':') {
        			ans += "::";
				} else {
					ans += s[j];
				}
			}
			ans += ":;";
		}
		return ans;
    }

    /**
     * @param str a string
     * @return dcodes a single string to a list of strings
     */
    vector<string> decode(string& str) {
        // Write your code here
        vector<string> ans;
        string item;
		int i = 0;
		while (i < str.length()) {
			if (str[i] == ':') {
				if (str[i + 1] == ';') {
					ans.push_back(item);
					item = "";
					i += 2;	
				} else {
					item += str[i + 1];
					i += 2;
				}
			} else {
				item += str[i];
				i += 1;
			}
		}
		return ans;
    }
};