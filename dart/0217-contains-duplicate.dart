// Time Complexity: O(n)
// Space Complexity: O(n)

class Solution {
  bool containsDuplicate(List<int> nums) {
    Set<int> hashSet = Set<int>();
    for (int n in nums) {
      if (hashSet.contains(n)) {
        return true;
      }
      hashSet.add(n);
    }
    return false;
  }
}
