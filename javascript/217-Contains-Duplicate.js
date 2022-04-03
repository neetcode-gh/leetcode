class Solution {
  containsDuplicate(nums) {
    const hashset = new Set()
    for (let num of nums) {
      if (hashset.has(num)) {
        return true
      } else {
        hashset.add(num)
      }
    }
    return false
  };
}