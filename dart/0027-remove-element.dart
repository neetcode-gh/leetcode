class Solution {
  int removeElement(List<int> nums, int val) {
      int i = 0;
      int end = nums.length - 1;
      while (i <= end) {
          if (nums[i] == val) {
              int tmp = nums[end];
              nums[end] = nums[i];
              nums[i] = tmp;
              end -= 1;
          } else {
              i += 1;
          }
      }
      return i;
  }
}