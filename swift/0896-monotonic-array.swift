/**
 * Question Link: https://leetcode.com/problems/monotonic-array/
 */

 class Solution {
    func isMonotonic(_ nums: [Int]) -> Bool {
        var inc = true
        var dec = true
        for i in 0..<nums.count - 1 {
            if nums[i] > nums[i + 1] {
                inc = false
            }
            if nums[i] < nums[i + 1] {
                dec = false
            }
        }
        return inc || dec
    }
}