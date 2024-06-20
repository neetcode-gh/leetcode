/**
 * Question Link: https://leetcode.com/problems/contains-duplicate-ii/
 */

 class Solution {
    func containsNearbyDuplicate(_ nums: [Int], _ k: Int) -> Bool {
        var hashset = Set<Int>()
        var l = 0
        for r in 0..<nums.count {
            if r - l > k {
                hashset.remove(nums[l])
                l += 1
            }
            if hashset.contains(nums[r]) {
                return true
            }
            hashset.insert(nums[r])
        }
        return false
    }
}