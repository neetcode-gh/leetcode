class Solution {
  List<List<int>> threeSum(List<int> nums) {
    List<List<int>> result = [];
    nums.sort();

    for (var i = 0; i < nums.length; i++) {
      var a = nums[i];
      if (i > 0 && a == nums[i - 1]) continue;

      var l = i + 1;
      var r = nums.length - 1;
      while (l < r) {
        var sum = a + nums[l] + nums[r];
        if (sum < 0) {
          l++;
        } else if (sum > 0) {
          r--;
        } else {
          result.add([a, nums[l], nums[r]]);
          l++;
          r--;
          while (l < r && nums[l] == nums[l - 1]) {
            l++;
          }
        }
      }
    }

    return result;
  }
}
