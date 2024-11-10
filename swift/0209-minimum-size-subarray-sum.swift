/**
 * Question Link: https://leetcode.com/problems/minimum-size-subarray-sum/
 */
 
 class Solution {
    func minSubArrayLen(_ target: Int, _ nums: [Int]) -> Int {
        var l = 0
        var total = 0
        var length = Int.max
        for r in 0..<nums.count {
            total += nums[r]
            while total >= target {
                length = min(length, r - l + 1)
                total -= nums[l]
                l += 1
            }
        }
        return length == Int.max ? 0 : length
    }
}