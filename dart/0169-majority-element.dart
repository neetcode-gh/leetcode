class Solution {
  int majorityElement(List<int> nums) {
    int res = 0;
    int count = 0;

    for (int n in nums) {
      if (count == 0) {
        res = n;
      }

      if (res == n) {
        count++;
      } else {
        count--;
      }
    }

    return res;
  }
}
