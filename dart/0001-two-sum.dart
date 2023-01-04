// Time Complexity: O(n)
// Space Complexity: O(n)

class Solution {
  List<int> twoSum(List<int> nums, int target) {
    var map = Map<int, int>();
    for (int i = 0; i < nums.length; i++) {
      var x = target - nums[i];
      if (map.containsKey(x)) return [map[x]!, i];
      map[nums[i]] = i;
    }
    throw "";
  }
}
