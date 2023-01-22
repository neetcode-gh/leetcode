class Solution {
  int search(List<int> nums, int target) {
      int l = 0, r = nums.length - 1;
      while (l <= r) {
          int m = (l + r) ~/ 2;
          if (nums[m] == target) {
              return m;
          } else {
              if (nums[m] > target) {
                  r = m - 1;
              } else {
                  l = m + 1;
              }
          }
      }
      return -1;
  }
}