class Solution {
public:
	vector<int> shuffle(vector<int>& nums, int n) {
		int lp = 0;
		int rp = n;
		int p = 0;
		vector<int> shuffled(2*n);
		
		while (p < 2 * n) {
			shuffled[p++] = nums[lp++];
			shuffled[p++] = nums[rp++];
		}
		return shuffled;
	}
};
