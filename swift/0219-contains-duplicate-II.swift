class Solution {
  func containsNearbyDuplicate(_ nums: [Int], _ k: Int) -> Bool {
      var window = Set<Int>()
      var left = 0

      for right in nums.indices {
          if abs(right - left) > k {
              window.remove(nums[left])
              left += 1
          }
          if window.contains(nums[right]) {
              return true
          }
          window.insert(nums[right])
      }
      return false
  }
}
