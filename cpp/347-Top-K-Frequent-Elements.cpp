class Solution {
public:
	vector<int> topKFrequent(vector<int>& nums, int k) {
		unordered_map<int, int> count;
		for (int n : nums) {
			++count[n];
		}

		vector<vector<int>> freq(nums.size() + 1, vector<int>());
		for (auto e : count) {
			freq[e.second].push_back(e.first);
		}

		vector<int> result;
		for (int i = freq.size()-1; i >= 0; --i) {
			for (int n : freq[i]) {
				result.push_back(n);
				if (result.size() == k)
					return result;
			}
		}
		return result;
	}
};
