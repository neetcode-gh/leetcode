// Time Complexity: O(n)
// Space Complexity: O(n)

class Solution {
 List<int> getConcatenation(List<int> nums) {
  List<int> ans = List<int>.filled(2 * nums.length, 0);
  for (int i = 0; i < nums.length; i++) {
    ans[i] = nums[i];
    ans[i + nums.length] = nums[i];
  }
  return ans;
}

  
class Solution {
  List<int> getConcatenation(List<int> nums) {
    return nums + nums;
  }
}
