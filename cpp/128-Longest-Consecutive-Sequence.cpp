class Solution {
public:
	int longestConsecutive(vector<int>& nums) {
		unordered_set<int> hs;
		for (int n : nums) {
			hs.insert(n);
		}

		int longest = 0;
		for (int n : nums) {
			// if n-1 is not in the set, the element can be the start of a sequence
			if (hs.find(n - 1) == hs.end()) {
				int length = 1;
				while (hs.find(n + length) != hs.end())
					++length;
				longest = max(longest, length);
			}
		}
		return longest;
	}
};
