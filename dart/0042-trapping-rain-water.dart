class Solution {
  int trap(List<int> height) {
    int n = height.length;
    
    if (n == 0) return 0;
    
    // Initialize leftMax to store the largest height present to the left of every bar
    List<int> leftMax = List<int>.filled(n, 0);
    leftMax[0] = height[0];
    for (int i = 1; i < n; ++i) {
      leftMax[i] = height[i] > leftMax[i - 1] ? height[i] : leftMax[i - 1];
    }
    
    // Initialize rightMax similar to leftMax but for largest height to the right
    List<int> rightMax = List<int>.filled(n, 0);
    rightMax[n - 1] = height[n - 1];
    for (int i = n - 2; i >= 0; --i) {
      rightMax[i] = height[i] > rightMax[i + 1] ? height[i] : rightMax[i + 1];
    }
    
    int waterTrapped = 0;
    
    for (int i = 0; i < n; ++i) {
      // The minimum of both side decides how much water can be trapped
      int minHeight = leftMax[i] < rightMax[i] ? leftMax[i] : rightMax[i];
      
      // If the minHeight is more than the current height at a point, water is present there
      if (minHeight > height[i]) {
        waterTrapped += minHeight - height[i];
      }
    }
    
    return waterTrapped;
  }
}
