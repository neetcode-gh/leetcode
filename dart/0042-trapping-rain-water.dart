class Solution {
  int trap(List<int> height) {
    if (height.isEmpty) return 0;

    int l = 0;
    int r = height.length - 1;
    int leftMax = height[l];
    int rightMax = height[r];
    int res = 0;

    while (l < r) {
      if (leftMax < rightMax) {
        l++;
        leftMax = leftMax > height[l] ? leftMax : height[l];
        res += leftMax - height[l];
      } else {
        r--;
        rightMax = rightMax > height[r] ? rightMax : height[r];
        res += rightMax - height[r];
      }
    }
    return res;
  }
}
