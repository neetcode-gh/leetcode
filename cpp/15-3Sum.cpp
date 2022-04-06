class Solution {
public:
	vector<vector<int>> threeSum(vector<int>& nums) {
		sort(nums.begin(), nums.end());
		vector<vector<int>> res;
		for (int i = 0; i < nums.size(); ++i) {
			int a = nums[i];
			// triplet should not contain duplicate elements
			if (i > 0 && a == nums[i - 1])
				continue;
			// 2 ptr approach
			int l = i + 1, r = nums.size() - 1;
			while (l < r) {
				int threeSum = a + nums[l] + nums[r];
				if (threeSum > 0)
					r -= 1;
				else if (threeSum < 0)
					l += 1;
				else {
					// found triplet
					res.push_back({ a, nums[l], nums[r] });
					l += 1;
					// skip duplicates
					while (nums[l] == nums[l - 1] && l < r)
						l += 1;
				}
			}
		}
		return res;
	}
};
