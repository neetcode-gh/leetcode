class Solution {
public:
	int trap(vector<int>& height) { 
		// amount of rain water = min(leftMax,rightMax) - height[i]
		int n = height.size();
		// cannot trap if n<3
		if (n < 3)
			return 0;

		int leftMax = height[0];
		int rightMax = height[n - 1];
		// leftmost and rightmost cannot trap water
		int l = 1, r = n - 2;
		int res = 0;
		while (l <= r) {
			// move lower ptr first
			if (leftMax < rightMax) {
				leftMax = max(leftMax, height[l]);
				res += leftMax - height[l];
				++l;
			}
			else {
				rightMax = max(rightMax, height[r]);
				res += rightMax - height[r];
				--r;
			}
		}

		return res;
	}
};
