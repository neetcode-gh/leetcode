// Time Complexity: O(n)
// Space Complexity: O(1)

import 'dart:math';

class Solution {
  int maxArea(List<int> height) {
    var maxWater = 0, l = 0, r = height.length - 1;
    while (l < r) {
      var dist = r - l;
      var minHeight = min(height[l], height[r]);
      
      if ((minHeight * dist) > maxWater) {
        maxWater = minHeight * dist;
      }

      if (height[l] < height[r])
        l++;
      else
        r--;
    }
    return maxWater;
  }
}
