class Solution {
  int singleNumber(List<int> nums) {
    int? val = null;
    nums.sort();
    int i = 0;
    while (i < nums.length - 2) {
      if (!(nums[i] != nums[i + 2] && nums[i] == nums[i + 1])) {
        val = nums[i];
        break;
      } else {
        i = i + 2;
      }
    }
    if (val == null) {
      val = nums[nums.length - 1];
    }
    return val;
  }
}
