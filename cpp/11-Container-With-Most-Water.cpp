class Solution {
public:
	int maxArea(vector<int>& height) {
		int res = 0;
		int l = 0, r = height.size() - 1;
		while (l < r) {
			// width: r-l, height: smaller between height[l] and height[r]
			int area = (r - l) * min(height[l], height[r]);
			res = max(res, area);
			// move smaller height
			if (height[l] < height[r])
				++l;
			else
				--r;
		}
		return res;
	}
};
