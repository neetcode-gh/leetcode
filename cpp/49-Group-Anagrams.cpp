class Solution {
public:
	vector<vector<string>> groupAnagrams(vector<string>& strs) {
		unordered_map<string, vector<string>> hash;

		for (string &s : strs) {
			string key = s;
			sort(key.begin(), key.end()); // klogk * n
			hash[key].push_back(s);
		}

		vector<vector<string>> result;
		for (auto &entry : hash) {
			result.push_back(entry.second);
		}

		return result;
	}
};
